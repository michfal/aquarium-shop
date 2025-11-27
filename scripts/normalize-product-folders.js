import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

/**
 * ENV:
 *  - VITE_SUBABASE_URL (Twoja nazwa)   // fallback: VITE_SUPABASE_URL
 *  - SUPABASE_SERVICE_ROLE_KEY         // klucz serwisowy (wymagany do move/remove)
 *  - BUCKET_NAME (opcjonalnie, domyślnie 'product-images')
 *  - DRY_RUN=1 (opcjonalnie: tylko loguje, nic nie zmienia)
 */
const SUPA_URL = process.env.VITE_SUBABASE_URL || process.env.VITE_SUPABASE_URL || '';

const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BUCKET = process.env.BUCKET_NAME || 'product-images';
const DRY_RUN = process.env.DRY_RUN === '1';

if (!SUPA_URL || !SERVICE_KEY) {
  console.error('❌ Brak VITE_SUBABASE_URL/VITE_SUPABASE_URL lub SUPABASE_SERVICE_ROLE_KEY w .env');
  process.exit(1);
}

const supabase = createClient(SUPA_URL, SERVICE_KEY);

const IMG_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'];

function extLower(name) {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i).toLowerCase() : '';
}
function isImage(name) {
  return IMG_EXT.includes(extLower(name));
}
function isMainName(name) {
  return /^main\.(png|jpe?g|webp|gif|avif)$/i.test(name);
}

async function listRoot() {
  const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 1000 });
  if (error) throw error;
  return data ?? [];
}

async function listPrefix(prefix) {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 1000 });
  if (error) return { files: null, error };
  return { files: data ?? [], error: null };
}

/**
 * Heurystyka wyboru kandydata na nowe main:
 * - bierzemy pierwszy „nie-main” plik graficzny (posortowane alfabetycznie dla deterministyczności)
 */
function pickCandidate(otherImages) {
  if (!otherImages || otherImages.length === 0) return null;
  const sorted = [...otherImages].sort((a, b) => a.name.localeCompare(b.name));
  return sorted[0];
}

async function ensureMainAndClean(prefix, entries) {
  const keep = entries.find((f) => f.name === '.keep');
  const images = entries.filter((f) => !f.name.endsWith('/') && isImage(f.name));

  if (images.length === 0) {
    console.log(`  • brak obrazków — .keep zostaje`);
    return;
  }

  const mainImages = images.filter((f) => isMainName(f.name));
  const otherImages = images.filter((f) => !isMainName(f.name));
  const hasMain = mainImages.length > 0;

  // 1) Jeśli jest main AND jest inny obraz — usuń main, potem przemianuj inny na main.<ext>
  if (hasMain && otherImages.length > 0) {
    const currentMain = mainImages[0]; // jeśli jest więcej niż jeden, bierzemy pierwszy
    const candidate = pickCandidate(otherImages);
    const candidateExt = extLower(candidate.name);
    const currentMainPath = `${prefix}${currentMain.name}`;
    const candidatePath = `${prefix}${candidate.name}`;
    const newMainPath = `${prefix}main${candidateExt}`;

    console.log(
      `  ↻ replace main: usuwam ${currentMainPath}, a potem ${candidatePath} → ${newMainPath}`,
    );

    if (!DRY_RUN) {
      // a) Usuń istniejący main.<ext>
      const del = await supabase.storage.from(BUCKET).remove([currentMainPath]);
      if (del?.error) {
        console.warn(`  ⚠️ remove main error: ${del.error.message}`);
      }

      // b) Przenieś wybrany obraz jako nowy main.<ext>
      let mv = await supabase.storage.from(BUCKET).move(candidatePath, newMainPath);
      if (mv.error) {
        // na wszelki wypadek spróbuj usunąć cel i ponowić (np. gdy istniał plik z tym samym rozszerzeniem)
        await supabase.storage.from(BUCKET).remove([newMainPath]);
        mv = await supabase.storage.from(BUCKET).move(candidatePath, newMainPath);
        if (mv.error) {
          console.warn(`  ⚠️ move candidate→main error: ${mv.error.message}`);
        }
      }
    }
  }

  // 2) Jeśli nie ma w ogóle main — zrób main z pierwszego dostępnego
  else if (!hasMain && otherImages.length > 0) {
    const candidate = pickCandidate(otherImages);
    const candidateExt = extLower(candidate.name);
    const src = `${prefix}${candidate.name}`;
    const dst = `${prefix}main${candidateExt}`;
    console.log(`  → create main: ${src}  ->  ${dst}`);
    if (!DRY_RUN) {
      let mv = await supabase.storage.from(BUCKET).move(src, dst);
      if (mv.error) {
        await supabase.storage.from(BUCKET).remove([dst]);
        mv = await supabase.storage.from(BUCKET).move(src, dst);
        if (mv.error) {
          console.warn(`  ⚠️ move error: ${mv.error.message}`);
        }
      }
    }
  } else {
    // hasMain && otherImages.length === 0
    console.log(`  • tylko main.* — bez zmian`);
  }

  // 3) Usuń .keep, jeśli istnieje i folder ma już obrazki
  if (keep) {
    const keepPath = `${prefix}.keep`;
    console.log(`  ✂ delete: ${keepPath}`);
    if (!DRY_RUN) {
      const { error } = await supabase.storage.from(BUCKET).remove([keepPath]);
      if (error) console.warn(`  ⚠️ remove .keep error: ${error.message}`);
    }
  }
}

async function main() {
  console.log(`Bucket: ${BUCKET} | dryRun=${DRY_RUN ? 'YES' : 'NO'}`);

  let roots;
  try {
    roots = await listRoot();
  } catch (e) {
    console.error('❌ list root error:', e);
    process.exit(1);
  }

  for (const entry of roots) {
    const name = entry.name;
    if (!name || name === 'tmp' || name.startsWith('.')) continue;

    const prefix = `${name}/`;
    const { files, error } = await listPrefix(prefix);
    if (error) continue;
    if (!files || files.length === 0) {
      console.log(`• ${prefix} (pusto) — nic do zmiany`);
      continue;
    }

    console.log(`\n📁 ${prefix}`);
    const childFiles = files.filter((f) => !f.name.endsWith('/'));
    await ensureMainAndClean(prefix, childFiles);
  }

  console.log('\n✅ Done');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

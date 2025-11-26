import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

/**
 * Użycie:
 *   node scripts/create-product-folders.js <category-slug>
 *
 * ENV:
 *  - VITE_SUPABASE_URL (lub SUPABASE_URL)
 *  - SUPABASE_SERVICE_ROLE_KEY
 * Opcjonalne:
 *  - BUCKET_NAME           (domyślnie 'product-images')
 *  - TMP_PREFIX            (domyślnie 'tmp/')
 *  - DRY_RUN=1             (loguje, bez zmian)
 */

const SUPA_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BUCKET = process.env.BUCKET_NAME || 'product-images';
const TMP_PREFIX = process.env.TMP_PREFIX || 'tmp/';
const DRY_RUN = process.env.DRY_RUN === '1';

if (!SUPA_URL || !SERVICE_KEY) {
  console.error('❌ Brak VITE_SUPABASE_URL/SUPABASE_URL lub SUPABASE_SERVICE_ROLE_KEY w .env');
  process.exit(1);
}

const categorySlug = process.argv[2];
if (!categorySlug) {
  console.error(
    '❌ Podaj slug kategorii, np.: node scripts/create-product-folders.js filtracja-woda',
  );
  process.exit(1);
}

const supabase = createClient(SUPA_URL, SERVICE_KEY);

const IMG_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'];
const isImage = (name) => {
  const i = name.lastIndexOf('.');
  const ext = i >= 0 ? name.slice(i).toLowerCase() : '';
  return IMG_EXT.includes(ext);
};

async function listTmpImages() {
  const { data, error } = await supabase.storage.from(BUCKET).list(TMP_PREFIX, { limit: 1000 });
  if (error) throw error;
  const files = (data || []).filter((f) => !f.name.endsWith('/') && isImage(f.name));
  // deterministycznie: po nazwie
  files.sort((a, b) => a.name.localeCompare(b.name));
  return files;
}

async function getCategoryIdBySlug(slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  if (!data) throw new Error(`Brak kategorii o slugu: ${slug}`);
  return data.id;
}

async function listProductsForCategory(categoryId) {
  const { data, error } = await supabase
    .from('products')
    .select('slug, category_id')
    .eq('category_id', categoryId)
    .order('slug', { ascending: true });

  if (error) throw error;
  return (data || []).filter((p) => p.slug && String(p.slug).trim());
}

async function folderExists(prefix) {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 1 });
  if (error) throw error;
  return data && data.length > 0;
}

async function uploadKeep(prefix) {
  const keepPath = `${prefix}.keep`;
  const content = Buffer.from(`placeholder for '${prefix}'\n`, 'utf-8');
  if (DRY_RUN) {
    console.log(`  + keep: ${keepPath}`);
    return true;
  }
  const { error } = await supabase.storage.from(BUCKET).upload(keepPath, content, {
    contentType: 'text/plain; charset=utf-8',
    upsert: false,
    cacheControl: '0',
  });
  if (error) {
    console.warn(`  ⚠️ keep upload warn: ${error.message}`);
    return false;
  }
  console.log(`  ✓ keep uploaded: ${keepPath}`);
  return true;
}

async function moveTmpFileToProduct(tmpName, destPrefix) {
  const src = `${TMP_PREFIX}${tmpName}`;
  const dst = `${destPrefix}${tmpName}`;

  if (DRY_RUN) {
    console.log(`  → move: ${BUCKET}/${src}  ->  ${BUCKET}/${dst}`);
    return true;
  }

  // jeśli docelowy plik istnieje, usuń i spróbuj ponownie (ostrożnie)
  let mv = await supabase.storage.from(BUCKET).move(src, dst);
  if (mv.error) {
    // spróbuj usunąć cel i ponowić
    await supabase.storage.from(BUCKET).remove([dst]);
    mv = await supabase.storage.from(BUCKET).move(src, dst);
    if (mv.error) {
      console.warn(`  ⚠️ move error: ${mv.error.message}`);
      return false;
    }
  }
  console.log(`  ✓ moved: ${src} -> ${dst}`);
  return true;
}

async function main() {
  console.log(
    `\n▶ category: ${categorySlug} | bucket: ${BUCKET} | tmp: ${TMP_PREFIX} | dryRun=${DRY_RUN ? 'YES' : 'NO'}`,
  );

  // 1) id kategorii
  const catId = await getCategoryIdBySlug(categorySlug);

  // 2) produkty z kategorii
  const products = await listProductsForCategory(catId);
  if (products.length === 0) {
    console.log('Brak produktów w tej kategorii.');
    return;
  }

  // 3) pliki w tmp/
  const tmpFiles = await listTmpImages();
  let tmpIdx = 0;

  let created = 0;
  let existed = 0;
  let moved = 0;
  let kept = 0;

  for (const p of products) {
    const slug = p.slug;
    const prefix = `${slug}/`;
    const exists = await folderExists(prefix);

    if (exists) {
      existed++;
      console.log(`\n📁 ${prefix} (istnieje)`);
      if (tmpIdx < tmpFiles.length) {
        const file = tmpFiles[tmpIdx++];
        const ok = await moveTmpFileToProduct(file.name, prefix);
        if (ok) moved++;
      } else {
        console.log('  • brak plików w tmp — pomijam (dla istniejącego katalogu nie tworzę .keep)');
      }
      continue;
    }

    // folder nie istnieje
    console.log(`\n📁 ${prefix} (NOWY)`);
    if (tmpIdx < tmpFiles.length) {
      const file = tmpFiles[tmpIdx++];
      const ok = await moveTmpFileToProduct(file.name, prefix);
      if (ok) {
        created++;
        moved++;
      }
    } else {
      // brak plików — tworzymy .keep tylko dla nowo utworzonych
      const ok = await uploadKeep(prefix);
      if (ok) {
        created++;
        kept++;
      }
    }
  }

  console.log(`\n✅ Done for category '${categorySlug}'. Stats:`);
  console.log(`   products: ${products.length}`);
  console.log(`   existed:  ${existed}`);
  console.log(`   created:  ${created}`);
  console.log(`   moved:    ${moved}`);
  console.log(`   keep:     ${kept}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

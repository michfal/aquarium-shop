import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

/**
 * ENV:
 *  - VITE_SUPABASE_URL (lub SUPABASE_URL jako fallback)
 *  - SUPABASE_SERVICE_ROLE_KEY   (uwaga: klucz serwisowy!)
 * Opcjonalnie:
 *  - BUCKET_NAME (domyślnie 'product-images')
 *  - DRY_RUN=1   (pokaż co by zrobił, bez zmian)
 */
const SUPA_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const BUCKET = process.env.BUCKET_NAME || 'product-images'
const DRY_RUN = process.env.DRY_RUN === '1'

if (!SUPA_URL || !SERVICE_KEY) {
  console.error('❌ Brak VITE_SUPABASE_URL/SUPABASE_URL lub SUPABASE_SERVICE_ROLE_KEY w .env')
  process.exit(1)
}

const supabase = createClient(SUPA_URL, SERVICE_KEY)

async function main() {
  // 1) pobierz slug wszystkich produktów
  const { data: products, error } = await supabase
    .from('products')
    .select('slug')
    .order('slug', { ascending: true })

  if (error) throw error

  let created = 0
  let skipped = 0

  for (const p of products ?? []) {
    const slug = p && p.slug
    if (!slug || !String(slug).trim()) {
      skipped++
      continue
    }

    const prefix = `${slug}/`

    // 2) sprawdź czy folder „istnieje” (czyli czy są w nim jakiekolwiek pliki)
    const { data: files, error: listErr } = await supabase
      .storage.from(BUCKET)
      .list(prefix, { limit: 1 })

    if (listErr) {
      console.error('List error for', prefix, listErr)
      skipped++
      continue
    }

    if (files && files.length > 0) {
      console.log(`✓ istnieje: ${prefix}`)
      skipped++
      continue
    }

    // 3) wrzuć placeholder, aby utworzyć folder
    const keepPath = `${prefix}.keep`
    const content = Buffer.from(
      `This placeholder ensures the '${prefix}' folder exists in Supabase Storage.\n`,
      'utf-8'
    )

    console.log(`+ tworzenie: ${keepPath}`)

    if (!DRY_RUN) {
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(keepPath, content, {
          contentType: 'text/plain; charset=utf-8',
          upsert: false,
          cacheControl: '0',
        })
      if (upErr) {
        // jeśli plik już istnieje: OK, uznajmy że folder jest
        console.warn(`warn: upload ${keepPath}:`, upErr.message)
      } else {
        created++
      }
    }
  }

  console.log(`\nDone. created=${created}, skipped=${skipped}, dryRun=${DRY_RUN}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

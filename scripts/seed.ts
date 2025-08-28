// scripts/seed.ts
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

const shouldReset = process.argv.includes('--reset')

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Brak SUPABASE_URL lub SUPABASE_SERVICE_ROLE_KEY w .env')
    process.exit(1)
  }

  if (shouldReset) {
    console.log('🧹 Reset danych...')
    await supabase.from('products').delete().neq('id', 0)
    await supabase.from('categories').delete().neq('id', 0)
  }

  console.log('🌱 Seed danych...')
  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .insert([
      { slug: 'ryby', name: 'Ryby' },
      { slug: 'akwaria', name: 'Akwaria' },
      { slug: 'filtry', name: 'Filtry' },
      { slug: 'pokarmy', name: 'Pokarmy' },
      { slug: 'akcesoria', name: 'Akcesoria' }
    ])
    .select()

  if (catErr) throw catErr

  const bySlug = Object.fromEntries(categories!.map(c => [c.slug, c]))
  const { error: prodErr } = await supabase.from('products').insert([
    { name: 'Gupik', price: 5.99, category_id: bySlug['ryby'].id },
    { name: 'Molinezja', price: 7.50, category_id: bySlug['ryby'].id },
    { name: 'Akwarium 60l', price: 199.99, category_id: bySlug['akwaria'].id },
    { name: 'Filtr AquaClear', price: 120.00, category_id: bySlug['filtry'].id },
    { name: 'Pokarm płatkowany', price: 15.99, category_id: bySlug['pokarmy'].id },
    { name: 'Siatka do ryb', price: 9.99, category_id: bySlug['akcesoria'].id }
  ])
  if (prodErr) throw prodErr

  console.log('✅ Gotowe!')
}

main().catch(e => {
  console.error('❌ Błąd seeda:', e)
  process.exit(1)
})


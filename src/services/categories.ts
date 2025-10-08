import { supabase } from '@/api/supabase'
import type { Category, CategoryWithUrl } from '@/types'
import { getSignUrlMany } from './images'

const BUCKET = 'product-images'

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) throw error
  return data as Category[]
}

export async function getCategoriesWithImages(): Promise<CategoryWithUrl[]> {
  const categories = await getCategories()
    const withImages = categories.filter(c => c.image)
    
    const signed = await getSignUrlMany(withImages.map(c => c.image!), BUCKET)

    const urlMap = new Map(withImages.map((c, i) => [c.image!, signed[i] ?? null]))

    return categories.map(c => ({
      ...c,
      imageUrl: c.image ? urlMap.get(c.image) ?? null : null,
    }))
}
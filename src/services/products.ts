import { supabase } from '@/api/supabase'
import type { Product } from '@/types'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('id')
  if (error) throw error
  return data as Product[]
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('id')
  if (error) throw error
  return data as Product[]
}

export async function getRecommended(limit = 3): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('recommended', true)
    .limit(limit)
  if (error) throw error
  return data as Product[]
}
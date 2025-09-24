import { supabase } from '@/api/supabase'
import type { Category } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) throw error
  return data as Category[]
}
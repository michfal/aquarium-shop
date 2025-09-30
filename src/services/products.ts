import { supabase } from '@/api/supabase'
import type { Product, ProductWitUrl } from '@/types'

const BUCKET = 'product-images'

async function signMany(paths: string[], expiresIn = 60 *60) {
  if(paths.length === 0) return []

  const {data, error} = await supabase
    .storage
    .from(BUCKET)
    .createSignedUrls(paths, expiresIn)

    if(error) throw error

    return data?.map(d => d?.signedUrl ?? null) ?? []
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('id')
  if (error) throw error
  return data as Product[]
}

export async function getProductsWithImages(): Promise<ProductWitUrl[]> {
  const products = await getProducts()
  const paths = products.map(p => p.image ?? '').filter(Boolean)
  const signed = await signMany(paths)

  let idx = 0
  return products.map(p => {
    let imageUrl: string | null = null
    if (p.image) {
      imageUrl = signed[idx] ?? null
      idx += 1
    }
    return {...p, imageUrl}
  })
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('id')
  if (error) throw error
  return data as Product[]
}

export async function getProductsByCategoryWithImages(categoryId: number): Promise<ProductWitUrl[]> {
  const products = await getProductsByCategory(categoryId)
  const paths = products.map(p => p.image ?? '').filter(Boolean)
  const signed = await signMany(paths)

  let idx = 0
  return products.map(p => {
    let imageUrl: string | null = null
    if (p.image) {
      imageUrl = signed[idx] ?? null
      idx += 1
    }
    return {...p, imageUrl}
  })
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

export async function getRecommendedWithImages(limit = 3): Promise<ProductWitUrl[]> {
  const products = await getRecommended(limit)
  const paths = products.map(p => p.image ?? '').filter(Boolean)
  const signed = await signMany(paths)

  let idx = 0
  return products.map(p => {
    let imageUrl: string | null = null
    if (p.image) {
      imageUrl = signed[idx] ?? null
      idx += 1
    }
    return {...p, imageUrl}
  })
}
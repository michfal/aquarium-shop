import { supabase } from '@/api/supabase'
import type { Product, ProductWithUrl } from '@/types'
import { getSignUrlMany } from './images'

const BUCKET = 'product-images'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('id')
  if (error) throw error
  return data as Product[]
}

export async function getProductsWithImages(): Promise<ProductWithUrl[]> {
  const products = await getProducts()
  const withImages = products.filter(p => p.image)

  const signed = await getSignUrlMany(withImages.map(c => c.image!), BUCKET)
  
  const urlMap = new Map(withImages.map((c, i) => [c.image!, signed[i] ?? null]))
  
  return products.map(c => ({
    ...c,
    imageUrl: c.image ? urlMap.get(c.image) ?? null : null,
  }))
}

export async function getProductById(productId: number): Promise<Product | null> {
    const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .maybeSingle()

    if (error) throw error
    return data
}

export async function getProductsByIdWithImages(productId: number): Promise<ProductWithUrl | null> {
  const product = await getProductById(productId)
  if (!product) return null

  const signed = product.image
    ? (await getSignUrlMany([product.image], BUCKET))[0] ?? null
    : null

  return { ...product, imageUrl: signed }
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

export async function getProductsByCategoryWithImages(categoryId: number): Promise<ProductWithUrl[]> {
  const products = await getProductsByCategory(categoryId)
  const withImages = products.filter(p => p.image)

  const signed = await getSignUrlMany(withImages.map(c => c.image!), BUCKET)
  
  const urlMap = new Map(withImages.map((c, i) => [c.image!, signed[i] ?? null]))
  
  return products.map(c => ({
    ...c,
    imageUrl: c.image ? urlMap.get(c.image) ?? null : null,
  }))
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

export async function getRecommendedWithImages(limit = 3): Promise<ProductWithUrl[]> {
  const products = await getRecommended(limit)
  const withImages = products.filter(p => p.image)

  const signed = await getSignUrlMany(withImages.map(c => c.image!), BUCKET)
  
  const urlMap = new Map(withImages.map((c, i) => [c.image!, signed[i] ?? null]))
  
  return products.map(c => ({
    ...c,
    imageUrl: c.image ? urlMap.get(c.image) ?? null : null,
  }))
}
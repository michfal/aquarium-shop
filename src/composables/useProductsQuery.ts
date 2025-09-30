import { useQuery } from '@tanstack/vue-query'
import { getProductsWithImages, getProductsByCategoryWithImages, getRecommendedWithImages } from '@/services/products'

export function useProductsQuery(opts?: { categoryId?: number }) {
  return useQuery({
    queryKey: ['products', opts?.categoryId ?? null],
    queryFn: () => (opts?.categoryId ? getProductsByCategoryWithImages(opts.categoryId) : getProductsWithImages()),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  })
}

export function useRecommendedProductsQuery(limit = 3) {
  return useQuery({
    queryKey: ['products', 'recommended', limit],
    queryFn: () => getRecommendedWithImages(limit),
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  })
}
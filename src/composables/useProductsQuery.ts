import { useQuery } from '@tanstack/vue-query'
import { getProducts, getProductsByCategory, getRecommended } from '@/services/products'

export function useProductsQuery(opts?: { categoryId?: string }) {
  return useQuery({
    queryKey: ['products', opts?.categoryId ?? null],
    queryFn: () => (opts?.categoryId ? getProductsByCategory(opts.categoryId) : getProducts()),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

export function useRecommendedProductsQuery(limit = 3) {
  return useQuery({
    queryKey: ['products', 'recommended', limit],
    queryFn: () => getRecommended(limit),
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
  })
}
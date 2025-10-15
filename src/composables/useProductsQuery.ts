import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'
import { getProductsWithImages, getProductsByCategoryWithImages, getRecommendedWithImages } from '@/services/products'
import type { MaybeRef } from '@/types'

export function useProductsQuery(opts?: { categoryId?: MaybeRef<number> }) {
  const catId = computed(() => unref(opts?.categoryId))

  return useQuery({
    queryKey: computed(() => ['products', Number.isFinite(catId.value) ? catId.value : null]),
    queryFn: () => 
      Number.isFinite(catId.value)
      ? getProductsByCategoryWithImages(catId.value as number)
      : getProductsWithImages(),
    enabled: computed(() =>
      opts?.categoryId ? Number.isFinite(catId.value) : true
    ),
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
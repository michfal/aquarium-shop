import { useQuery } from '@tanstack/vue-query'
import { getCategoriesWithImages } from '@/services/categories'

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesWithImages,
    staleTime: 10 * 60_000,
    gcTime: 30 * 60_000,
  })
}
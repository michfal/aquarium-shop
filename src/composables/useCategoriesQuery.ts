import { useQuery } from '@tanstack/vue-query'
import { getCategories } from '@/services/categories'

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 60_000,
    gcTime: 30 * 60_000,
  })
}
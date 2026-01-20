import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import {
  getProductsWithImages,
  getProductsByIdWithImages,
  getProductsByCategoryWithImages,
  getRecommendedWithImages,
} from '@/services/products';
import type { MaybeRef, ProductWithUrl } from '@/types';

export function useProductsQuery(opts?: { categoryId?: MaybeRef<number> }) {
  const catId = computed(() => unref(opts?.categoryId));

  return useQuery({
    queryKey: computed(() => ['products', Number.isFinite(catId.value) ? catId.value : null]),
    queryFn: () =>
      Number.isFinite(catId.value)
        ? getProductsByCategoryWithImages(catId.value as number)
        : getProductsWithImages(),
    enabled: computed(() => (opts?.categoryId ? Number.isFinite(catId.value) : true)),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}

export function useProductQuery() {
  const route = useRoute();
  const id = computed(() => Number(route.params.id));

  const queryClient = useQueryClient();

  const seedFromLists = (): ProductWithUrl | undefined => {
    const lists = queryClient.getQueriesData<ProductWithUrl[]>({ queryKey: ['products'] });
    for (const [, list] of lists) {
      const found = list?.find((p) => p.id === id.value);
      if (found) return found;
    }
    return undefined;
  };

  const seeded = seedFromLists();

  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductsByIdWithImages(id.value),
    enabled: computed(() => Number.isFinite(id.value)),
    ...(seeded && { initialData: seeded }),
    staleTime: 60_000,
  });
}

export function useRecommendedProductsQuery(limit = 3) {
  return useQuery({
    queryKey: ['products', 'recommended', limit],
    queryFn: () => getRecommendedWithImages(limit),
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  });
}

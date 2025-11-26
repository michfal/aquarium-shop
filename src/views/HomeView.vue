<script setup lang="ts">
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue';
import NewsLetter from '@/components/NewsLetter.vue';
import MainHeading from '@/components/MainHeading.vue';
import { useRecommendedProductsQuery } from '@/composables/useProductsQuery';
import { useCategoriesQuery } from '@/composables/useCategoriesQuery';

defineProps<{
  title?: string;
}>();

const { data: categories, isLoading: catLoading, error: catError } = useCategoriesQuery();
const { data: recommended, isLoading: recLoading, error: recError } = useRecommendedProductsQuery();
</script>

<template>
  <MainHeading title="Aqua-Shop" subtitle="The best aquarium products in one place." />
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Categories</h1>
    <div
      v-if="catLoading"
      class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <p>Ładowanie kategorii…</p>
    </div>
    <p v-else-if="catError">Błąd: {{ catError.message }}</p>
    <div
      v-else
      class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <CategoryCard
        v-for="c in categories"
        :key="c.id"
        :id="Number(c.id)"
        :name="c.name"
        :desc="c.description"
        :imageSrc="c.imageUrl"
      />
    </div>
  </section>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Recommended</h1>
    <div
      v-if="recLoading"
      class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <p>Ładowanie kategorii…</p>
    </div>
    <p v-else-if="recError">Błąd: {{ recError.message }}</p>
    <div
      v-else
      class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <ProductCard
        v-for="p in recommended"
        :name="p.name"
        :id="p.id"
        :price="p.price"
        :imageSrc="p.imageUrl"
        :alt="p.name"
        :key="p.id"
      />
    </div>
  </section>
  <NewsLetter />
</template>

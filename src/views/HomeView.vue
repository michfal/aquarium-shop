<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js'
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue';
import NewsLetter from '@/components/NewsLetter.vue';
import MainHeading from '@/components/MainHeading.vue';
import { useRoute } from 'vue-router';
import { useRecommendedProductsQuery } from '@/composables/useProductsQuery';
import { useProductsQuery } from '@/composables/useProductsQuery';
import { useCategoriesQuery } from '@/composables/useCategoriesQuery';
// const categories = ref(['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6']);
// const products = ref(['prod1', 'prod2', 'prod3']);
defineProps<{
  title?: string
}>();



const route = useRoute()
// np. /category/:id
// const categoryId = route.params.id as string

//const { data, isLoading, error } = useProductsQuery({ categoryId })
const { data: categories, isLoading: catLoading, error: catError } = useCategoriesQuery()
const { data: recommended, isLoading: recLoading, error: recError } = useRecommendedProductsQuery()
//const { data: recommended, isLoading: recLoading, error: recError } = useProductsQuery()
// onMounted(() => {
//   recommended?.value.forEach(c => {
//   console.log(c)
// })
//}) 

</script>

<template>
  <MainHeading title="Aqua-Shop" subtitle="The best aquarium products in one place."/>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Categories</h1>
    <div v-if="catLoading" class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <p>Ładowanie kategorii…</p>
    </div>
    <p v-else-if="catError">Błąd: {{ catError.message }}</p>
    <div v-else class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <CategoryCard v-for="c in categories" :key="c.id" :name="c.name" :desc="c.description"/>
    </div>
  </section>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Recommended</h1>
    <div v-if="recLoading" class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <p>Ładowanie kategorii…</p>
    </div>
    <p v-else-if="recError">Błąd: {{ recError.message }}</p>
    <div v-else class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <ProductCard v-for="p in recommended" :key="p.id"/>
    </div>
  </section>
  <NewsLetter />

</template>
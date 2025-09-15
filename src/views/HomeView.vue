<script setup lang="ts">
import { ref } from 'vue';
import CardList from '@/components/CardList.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue';
import Heading from '@/components/Heading.vue';
import NewsLetter from '@/components/NewsLetter.vue';

const categories = ref(['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6']);
const products = ref(['prod1', 'prod2', 'prod3']);
defineProps<{
  title?: string
}>()
</script>

<template>
  <Heading title="Aqua-Shop" subtitle="The best aquarium products in one place."/>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Categories</h1>
    <div class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <CategoryCard v-for="c in categories" :key="c"/>
    </div>
  </section>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Recommended</h1>
    <div class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <ProductCard v-for="p in products" :key="p"/>
    </div>
  </section>
  <NewsLetter />

</template>
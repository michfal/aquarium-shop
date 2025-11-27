<script setup lang="ts">
import MainHeading from '@/components/MainHeading.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useRoute } from 'vue-router';
import { useProductsQuery } from '@/composables/useProductsQuery';
import { useCategoriesQuery } from '@/composables/useCategoriesQuery';
import { computed } from 'vue';

const route = useRoute();
const categoryId = computed(() => Number(route.params.id));

const {
  data: products,
  isLoading: prodLoading,
  error: prodError,
} = useProductsQuery({ categoryId: categoryId });

const { data: categories } = useCategoriesQuery();

const category = computed(() => categories.value?.find((c) => c.id == categoryId.value));
</script>

<template>
  <MainHeading :title="category?.name" :subtitle="category?.description" />
  <section class="py-9 px-5">
    <h1 class="max-w-5xl mx-auto font-heading text-2xl text-left pb-5">{{ category?.name }}</h1>
    <div
      v-if="prodLoading"
      class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <p>Categories loading...</p>
    </div>
    <p v-else-if="prodError">Błąd: {{ prodError.message }}</p>
    <div
      v-else
      class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      <!-- <ProductCard
        v-for="p in products"
        :name="p.name"
        :price="p.price"
        :imageSrc="p.imageUrl"
        :alt="p.name"
        :key="p.id"
        :id="p.id"
      /> -->
      <ProductCard
        v-for="p in products"
        :product="p"
        :key="p.id"
      />
    </div>
  </section>
</template>

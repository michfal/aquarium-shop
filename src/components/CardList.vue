<script setup lang="ts">
import { ref } from 'vue';
import CategoryCard from './CategoryCard.vue';

const products = ref(['prod1', 'prod2', 'prod3'])
</script>

<template>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Categories</h1>
    <div class="flex gap-6 items-center justify-center">
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CategoryCard from './CategoryCard.vue';
import { defineProps } from 'vue';

const products = ref(['prod1', 'prod2', 'prod3']);
defineProps<{
  title?: string
}>()
</script>

<template>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">{{ title }}</h1>
    <div class="flex gap-6 items-center justify-center">
      <CategoryCard v-for="p in products" :key="p"/>
    </div>
  </section>
</template>
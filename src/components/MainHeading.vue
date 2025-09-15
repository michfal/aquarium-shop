<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title?: string,
  subtitle?: string
}>()
</script>

<template>
  <section class="h-120 flex flex-col items-center justify-center bg-[url(@/assets/img/hero-texture.png)] bg-center bg-cover">
    <h1 class="font-heading text-4xl text-white font-bold text-shadow-lg sm:text-6xl sm:mb-2">{{ title }}</h1>
    <p class="font-body text-white text-shadow-lg font-medium sm:text-xl">
      {{ subtitle }}
    </p>
  </section>
</template>
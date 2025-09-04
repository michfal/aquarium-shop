<script setup lang="ts">
import CardList from '@/components/CardList.vue';
</script>

<template>
  <section class="h-120 flex flex-col items-center justify-center bg-[url(@/assets/img/hero-texture.png)] bg-center bg-cover">
    <h1 class="font-heading text-4xl text-white font-bold text-shadow-lg">Aqua-Shop</h1>
    <p class="font-body text-white text-shadow-lg font-medium">
      The best aquarium products in one place.
    </p>
  </section>
  <CardList />
</template>
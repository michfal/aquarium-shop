<script setup lang="ts">
  defineProps<{
    count: number
  }>()
</script>

<template>
  <div class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
    <div v-for="c in count" :key="c" class="w-full rounded-3xl bg-sky-50 p-4 sm:p-6 min-h-38"></div>
  </div>
</template>
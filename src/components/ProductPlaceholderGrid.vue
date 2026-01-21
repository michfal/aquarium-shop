<script setup lang="ts">
  defineProps<{
    count: number
  }>()
</script>

<template>
  <div
      class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
    <div v-for="c in count" :key="c" class="w-full rounded-2xl border border-slate-200/50 bg-sky-50 p-4 sm:flex sm:flex-col min-h-68"></div>
  </div>
</template>
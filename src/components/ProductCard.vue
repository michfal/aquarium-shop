<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  name?: string,
  price?: number
  imageSrc?: string | null,
  alt?: string
}>()
</script>
<template>
<!-- KARTA PRODUKTU -->
<article class="w-full rounded-2xl border border-slate-200/50 bg-gray-50 shadow-sm p-4 
grid grid-cols-2 grid-rows-2 sm:flex sm:flex-col">
  <!-- obrazek -->
  <div class="mx-auto aspect-[1/1] w-36 overflow-hidden row-span-3">
    <img
    v-if="imageSrc"
      :src="imageSrc"
      alt="Internal filter"
      class="h-full w-full object-contain"
    />
  </div>

  <div class="mt-4 flex flex-col items-center px-1 justify-between sm:flex-row sm:min-h-14">
    <h3 class="font-heading text-slate-800 text-xl sm:text-base">{{ name }}</h3>
    <span class="text-slate-800 font-semibold tracking-tight text-xl sm:text-base">{{ price }}&nbsp;zł</span>
  </div>

  <button
    type="button"
    class="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 text-white font-semibold tracking-wide shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 active:translate-y-px transition"
  >
    Add to cart
  </button>
</article>

</template>
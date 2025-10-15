<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  name?: string,
  desc?: string,
  imageSrc?: string | null,
  id?: number
}>()
</script>
<template>
  <article class="flex items-center gap-4 w-full rounded-3xl bg-sky-50 p-4 sm:gap-6 sm:p-6 ">
    <div class="shrink-0 grid place-items-center w-20 h-28 sm:w-24 sm:h-32">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="name"
        class="h-24 sm:h-28 w-auto object-contain"
        loading="lazy"
      />
      <div v-else class="bg-black h-full w-full rounded-lg bg-sky-100 opacity-70"></div>
    </div>

    <div>
      <h3 class="font-medium color-deep-navy text-xl sm:text-xl leading-tight">
        {{ name }}
      </h3>

      <p class="mt-1 text-xs sm:text-sm text-black/60 max-w-[28ch]">
        {{desc}}
      </p>

      <RouterLink
        :to="'/categories/' + id"
        class="mt-3 inline-block font-medium tracking-wide text-sm text-brand-orange hover:underline"
      >
        View more
      </RouterLink>
    </div>
  </article>
</template>
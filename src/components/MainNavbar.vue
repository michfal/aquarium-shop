<script setup lang="ts">
import { ref } from 'vue';
import { useCategoriesQuery } from '@/composables/useCategoriesQuery';
import { RouterLink } from 'vue-router';
const isOpen = ref(false);
const { data: categories, isLoading: catLoading, error: catError } = useCategoriesQuery();
</script>

<template>
  <header class="h-16 bg-deep-navy flex items-center px-5">
    <nav class="flex items-center w-full justify-between relative">
      <RouterLink id="logo" to="/">
        <span class="text-3xl text-white font-logo">AQUA-SHOP</span>
      </RouterLink>

      <transition>
      <div v-if="isOpen" class="flex flex-col absolute top-0 right-0 mt-12 -mr-5 bg-deep-navy p-4 rounded-bl-xl">
        <ul v-if="categories">
          <li v-for="c in categories" :key="c.id">
          <RouterLink  class="text-white" :to="'/categories/' + c.id">
            {{c.name}}
          </RouterLink>
          </li>
        </ul>
      </div>
      </transition>
      <button 
        @click="isOpen = !isOpen" 
        class="text-white text-2xl focus:outline-none"
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </nav>
  </header>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
  transform-origin: top right;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0);
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
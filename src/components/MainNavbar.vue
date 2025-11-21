<script setup lang="ts">
import { ref } from 'vue';
import { useCategoriesQuery } from '@/composables/useCategoriesQuery';
import { RouterLink } from 'vue-router';

const isOpen = ref(false);
const productsAmount = ref(false)
const { data: categories } = useCategoriesQuery();
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
      <div class="flex items-center gap-8">
        <RouterLink class="w-5 relative" id="cart" to="/cart">
          <span v-if="productsAmount" class="bg-orange-500 rounded-full block w-4 h-4 absolute -top-1 -left-3 text-center font-bold flex items-center justify-center text-white text-xs">1</span>
          <i class="fa-solid fa-cart-arrow-down text-white">

          </i>
        </RouterLink>
        <button 
          @click="isOpen = !isOpen" 
          class="text-white cursor-pointer text-2xl justify-self-end focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
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
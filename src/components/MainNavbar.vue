<script setup lang="ts">
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<template>
  <header class="h-16 bg-deep-navy flex items-center px-5">
    <nav class="flex items-center w-full justify-between relative">
      <a id="logo" href="/">
        <span class="text-3xl text-white font-logo">AQUA-SHOP</span>
      </a>

      <transition>
      <ul v-if="isOpen" class="flex flex-col absolute top-0 right-0 mt-12 -mr-5 bg-deep-navy p-4 rounded-bl-xl">
        <li><a class="text-white" href="/">Food</a></li>
        <li><a class="text-white" href="/about">Plants</a></li>
        <li><a class="text-white" href="/contact">Decoration</a></li>
        <li><a class="text-white" href="/contact">Lights</a></li>
        <li><a class="text-white" href="/contact">Filters and Pumps</a></li>
        <li><a class="text-white" href="/contact">Tanks and Kits</a></li>
      </ul>
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
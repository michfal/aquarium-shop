<script setup lang="ts">

</script>

<template>
<footer class="bg-gradient-to-r from-[#01273B] to-[#001b2a] text-white">
  <div class="mx-auto max-w-7xl px-4">
    <div class="flex h-14 items-center justify-between gap-6">
      <!-- Logo -->
      <a href="/" class="font-heading font-bold tracking-wider text-white text-xl uppercase">
        AQUA-SHOP
      </a>

      <!-- Linki (desktop) -->
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <a href="/regulamin" class="text-white/90 hover:text-white transition-colors">Regulamin</a>
        <a href="/kontakt" class="text-white/90 hover:text-white transition-colors">Kontakt</a>
        <a href="/faq" class="text-white/90 hover:text-white transition-colors">FAQ</a>
        <a href="/zwroty" class="text-white/90 hover:text-white transition-colors">Zwroty</a>
      </nav>

      <!-- Ikony -->
      <div class="flex items-center gap-4">
        <!-- Instagram -->
        <a href="https://instagram.com" aria-label="Instagram"
           class="text-white/90 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5 fill-current" viewBox="0 0 24 24">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 18 6.75z"/>
          </svg>
        </a>
        <!-- Facebook -->
        <a href="https://facebook.com" aria-label="Facebook"
           class="text-white/90 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5 fill-current" viewBox="0 0 24 24">
            <path d="M13 22v-9h3l.5-4H13V7.5c0-1.1.3-1.8 1.9-1.8H17V2.1C16.3 2 15.1 2 13.8 2 10.9 2 9 3.6 9 6.8V9H6v4h3v9z"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Linki (mobile – pod paskiem) -->
    <nav class="md:hidden flex items-center gap-4 py-2 text-sm overflow-x-auto">
      <a href="/regulamin" class="text-white/90 hover:text-white whitespace-nowrap">Regulamin</a>
      <a href="/kontakt" class="text-white/90 hover:text-white whitespace-nowrap">Kontakt</a>
      <a href="/faq" class="text-white/90 hover:text-white whitespace-nowrap">FAQ</a>
      <a href="/zwroty" class="text-white/90 hover:text-white whitespace-nowrap">Zwroty</a>
    </nav>
  </div>
</footer>

</template>
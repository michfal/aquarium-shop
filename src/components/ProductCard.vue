<script setup lang="ts">
import type { ProductWithUrl } from '@/types';
import { RouterLink } from 'vue-router';
import { useCart } from '@/composables/useCart';
import { toRefs } from 'vue';

const { addToCart } = useCart();

function handleAdd(product: ProductWithUrl) {
  addToCart(product, 1);
}

const props = defineProps<{
  product: ProductWithUrl;
}>();

const { product } = toRefs(props);

</script>
<template>
  <article
    class="w-full rounded-2xl border border-slate-200/50 bg-gray-50 shadow-sm p-4 sm:flex sm:flex-col hover:brightness-98"
  >
    <RouterLink :to="'/product/' + product.id" class="no-underline hover:no-underline">
      <div class="mx-auto aspect-[1/1] w-36 overflow-hidden row-span-3">
        <img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          alt="Internal filter"
          class="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <div class="mt-4 flex flex-col items-center px-1 justify-between sm:flex-row sm:min-h-14">
        <h3 class="font-heading text-slate-800 text-xl sm:text-base">{{ product.name }}</h3>
        <span class="text-slate-800 font-semibold tracking-tight text-xl sm:text-base"
          >{{ product.price }}&nbsp;zł</span
        >
      </div>
    </RouterLink>
    <button
      type="button"
      @click="handleAdd(product)"
      class="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 text-white font-semibold tracking-wide shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 active:translate-y-px transition cursor-pointer"
    >
      Add to cart
    </button>
  </article>
</template>

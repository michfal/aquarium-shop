<script setup lang="ts">
import MainHeading from '@/components/MainHeading.vue';
import { useProductQuery } from '@/composables/useProductsQuery';
import type { ProductWithUrl } from '@/types';
import { useCart } from '@/composables/useCart';

const { data: product, isLoading: prodLoading } = useProductQuery();

const { addToCart } = useCart();

function handleAdd(product: ProductWithUrl) {
  addToCart(product, 1);
}
</script>

<template>
  <MainHeading title="Aqua-Shop" subtitle="The best aquarium products in one place." />
  <div class="pt-6">
    <div v-if="prodLoading">
      <p>Loading product...</p>
    </div>

    <section v-else class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div class="aspect-square w-full overflow-hidden rounded-2xl border border-slate-200">
            <img v-if="product?.imageUrl" :src="product?.imageUrl" />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h1 class="font-heading text-3xl sm:text-4xl font-semibold text-slate-900">
                {{ product?.name }}
              </h1>
            </div>
            <div class="text-right">
              <div class="text-3xl sm:text-4xl font-bold tracking-tight">
                {{ product?.price }}&nbsp;zł
              </div>
            </div>
          </div>

          <p class="mt-6 text-slate-700 leading-relaxed">{{ product?.description }}</p>

          <div class="mt-8 flex items-stretch gap-3">
            <button
              @click="product && handleAdd(product)"
              type="button"
              class="mt-1 w-full rounded-xl bg-orange-500 px-4 py-3 text-white font-semibold tracking-wide shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 active:translate-y-px transition cursor-pointer"
            >
              Add to cart
            </button>
          </div>

          <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div class="rounded-xl border border-slate-200 p-4">
              <p class="font-medium text-slate-900">Shipping within 24h</p>
              <p class="mt-1 text-slate-600">Order by 2:00 PM — we’ll ship today.</p>
            </div>
            <div class="rounded-xl border border-slate-200 p-4">
              <p class="font-medium text-slate-900">30-Day Returns</p>
              <p class="mt-1 text-slate-600">Hassle-free returns within 30 days.</p>
            </div>
            <div class="rounded-xl border border-slate-200 p-4">
              <p class="font-medium text-slate-900">2-Year Warranty</p>
              <p class="mt-1 text-slate-600">Official Polish distribution.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

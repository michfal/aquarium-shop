<script setup lang="ts">
import MainHeading from '@/components/MainHeading.vue';
import { useProductQuery } from '@/composables/useProductsQuery';
import type { ProductWithUrl } from '@/types';
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()

const { data: product, isLoading: prodLoading } = useProductQuery()

function addToCart(product: ProductWithUrl) {
  console.log('add')
  cart.add(
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category_id: product.category_id,
      slug: product.slug,
      imageUrl: product?.imageUrl,
    },
    1
  )
}

</script>

<template>
  <MainHeading title="Aqua-Shop" subtitle="The best aquarium products in one place."/>
  <div class="pt-6">
    <div v-if="prodLoading">
      <p>Loading product...</p>
    </div>

    <section v-else class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div class="aspect-square w-full overflow-hidden rounded-2xl border border-slate-200">
            <img v-if="product?.imageUrl" :src="product?.imageUrl"/>
          </div>
        </div>
      
        <div class="flex flex-col">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h1 class="font-heading text-3xl sm:text-4xl font-semibold text-slate-900">{{ product?.name }}</h1>
            </div>
            <div class="text-right">
              <div class="text-3xl sm:text-4xl font-bold tracking-tight">{{ product?.price }}&nbsp;zł</div>
            </div>
          </div>
        
          <p class="mt-6 text-slate-700 leading-relaxed">{{ product?.description }}</p>
        
          <div class="mt-8 flex items-stretch gap-3">
            <label class="sr-only" for="qty">Amount</label>
            <input id="qty" type="number" min="1" value="1" class="h-12 w-24 rounded-xl border border-slate-300 px-3 text-center text-base"/>
            <button @click="product && addToCart(product)" type="button" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold shadow-sm">Add to cart</button>
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
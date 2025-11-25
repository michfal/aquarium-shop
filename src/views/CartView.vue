<script setup lang="ts">
import MainHeading from '@/components/MainHeading.vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useShippingOptions } from '@/composables/useShippingOptions';

const cart = useCartStore();
const { products, itemQty, subtotal, lineTotal, isEmpty, shippingCost, total } = storeToRefs(cart)

const { options: shippingOptions, isLoading } = useShippingOptions();

const inc = (id: number ) => {
  cart.setQty(id, itemQty.value(id) + 1)
}

const dec = (id: number) => {
  const next = itemQty.value(id) - 1
  cart.setQty(id, next)
}

const onQtyInput = (id: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const value = Number(target.value)

  const safe = Number.isFinite(value) && value > 0 ? value : 1
  cart.setQty(id, safe)
}

</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <MainHeading title="Checkout" subtitle="Review your products before placing the order."/>
    <!-- Main content -->
    <main class="flex-1">
      <div class="container mx-auto px-4 py-10">
        <div class="grid lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-8">
          <!-- Cart -->
          <section>
            <h2 class="text-lg font-bold text-slate-800 mb-4">Products</h2>

            <div class="bg-white rounded-2xl shadow-md overflow-hidden">
              <!-- Header row -->
              <div class="hidden md:grid grid-cols-[minmax(0,2.5fr)_repeat(3,minmax(0,1fr))] gap-4 px-6 py-4 text-xs font-semibold uppercase text-slate-500 border-b border-slate-100 tracking-wide">
                <span>Product</span>
                <span class="text-right">Price</span>
                <span class="text-center">Amount</span>
                <span class="text-right">Total</span>
              </div>

              <div v-if="isEmpty" class="px-4 md:px-6 py-4 flex flex-col gap-4 border-b text-slate-500 border-slate-100 text-xs font-semibold uppercase">
                There are no items in your cart
              </div>
              <div v-else v-for="p in products" :key="p.id" class="px-4 md:px-6 py-4 flex flex-col gap-4 border-b border-slate-100 md:grid md:grid-cols-[minmax(0,2.5fr)_repeat(3,minmax(0,1fr))] md:items-center">
                <!-- Produkt -->
                <div class="flex items-center gap-4">
                  <div class="w-16 h-20 flex items-center justify-center bg-slate-100 rounded-xl">
                    <!-- image placeholder -->
                    <img
                      v-if="p.imageUrl"
                      :src="p.imageUrl"
                      :alt="p.name"
                      class="h-14 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p class="font-semibold text-slate-800">{{ p.name }}</p>
                  </div>
                </div>

                <!-- Cena -->
                <div class="md:text-right text-sm font-medium text-slate-700">
                  {{ p.price }}
                </div>

                <!-- Ilość -->
                <div class="md:text-center">
                  <div class="inline-flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <button @click="dec(p.id)" class="px-2 py-1 text-sm text-slate-500 hover:bg-slate-50">-</button>
                    <input
                      type="number"
                      :value="itemQty(p.id)"
                      @change="onQtyInput(p.id, $event)"
                      class="w-10 border-0 text-center text-sm font-medium text-slate-800 focus:ring-0"
                    />
                    <button @click="inc(p.id)" class="px-2 py-1 text-sm text-slate-500 hover:bg-slate-50">+</button>
                  </div>
                </div>

                <!-- Razem -->
                <div class="md:text-right text-sm font-semibold text-slate-800">
                  {{ lineTotal(p.id) }} zł
                </div>
              </div>

              <div class="px-4 md:px-6 py-4 border-t border-slate-100 flex justify-center"></div>
            </div>
          </section>

          <!-- Summary -->
          <aside class="space-y-6">
            <section class="bg-white rounded-2xl shadow-md p-5">
              <h2 class="text-lg font-bold text-slate-800 mb-4">Summary</h2>
            
              <div class="flex items-center justify-between text-sm mb-4">
                <span class="text-slate-600">Products total</span>
                <span class="font-bold text-slate-900">{{ subtotal }} zł</span>
              </div>
            
              <div v-if="shippingOptions" class="space-y-2 mb-4 text-sm">
                <label v-for="s in shippingOptions" :key="s.id" class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="shipping"
                    :value="s"
                    v-model="cart.shippingMethod" 
                    class="text-sky-600" />
                  <span class="flex-1 text-slate-700">{{ s.name }}: {{ s.price }} zł</span>
                </label>
              </div>
            
              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                  Discount code
                </label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    class="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                  <button class="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition">
                    APPLY
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between text-sm mb-4 mt-7">
                <span class="text-slate-600 font-semibold text-base">Order total</span>
                <span class="font-bold text-slate-900 text-base">{{ total }} zł</span>
              </div>

              <div class="mt-3">
                <button class="px-8 py-2.5 rounded-full bg-sky-600 text-white text-sm font-semibold shadow w-full hover:bg-sky-700 transition">
                  CHECKOUT
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>
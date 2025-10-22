<script setup lang="ts">
import MainHeading from '@/components/MainHeading.vue';
import { useProductQuery } from '@/composables/useProductsQuery';

const { data: product, isLoading: prodLoading, error: prodError } = useProductQuery()

</script>

<template>

  <MainHeading title="Aqua-Shop" subtitle="The best aquarium products in one place."/>
  <div class="pt-6">
  <!-- Breadcrumbs -->
  <!-- <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
    <ol class="flex items-center gap-2 text-sm text-slate-500">
      <li class="flex items-center gap-2">
        <a href="/" class="hover:text-slate-900">Home</a>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 118.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
      </li>
      <li class="flex items-center gap-2"><a href="/products" class="hover:text-slate-900">Products</a>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 118.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
      </li>
      <li class="text-slate-700" aria-current="page">Product Name</li>
    </ol>
  </nav> -->
  <div v-if="prodLoading">
    <p>Loading product...</p>
  </div>
  <!-- Main -->
  <section v-else class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <!-- Gallery -->
      <div>
        <div class="aspect-square w-full overflow-hidden rounded-2xl border border-slate-200">
          <img v-if="product?.imageUrl" :src="product?.imageUrl"/>
        </div>
        <!-- <div class="mt-4 grid grid-cols-5 gap-3">
          <button type="button" class="aspect-square rounded-xl border border-slate-900 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1524704654690-b56c05c78a50?q=80&w=400&auto=format&fit=crop" alt="Thumbnail 1" class="h-full w-full object-cover"/>
          </button>
          <button type="button" class="aspect-square rounded-xl border border-slate-200 hover:border-slate-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=400&auto=format&fit=crop" alt="Thumbnail 2" class="h-full w-full object-cover"/>
          </button>
          <button type="button" class="aspect-square rounded-xl border border-slate-200 hover:border-slate-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1420593248178-d88870618ca0?q=80&w=400&auto=format&fit=crop" alt="Thumbnail 3" class="h-full w-full object-cover"/>
          </button>
          <button type="button" class="aspect-square rounded-xl border border-slate-200 hover:border-slate-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=400&auto=format&fit=crop" alt="Thumbnail 4" class="h-full w-full object-cover"/>
          </button>
          <button type="button" class="aspect-square rounded-xl border border-slate-200 hover:border-slate-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&auto=format&fit=crop" alt="Thumbnail 5" class="h-full w-full object-cover"/>
          </button>
        </div> -->
      </div>

      <!-- Info -->
      <div class="flex flex-col">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="font-heading text-3xl sm:text-4xl font-semibold text-slate-900">{{ product?.name }}</h1>
          </div>
          <div class="text-right">
            <div class="text-3xl sm:text-4xl font-bold tracking-tight">{{ product?.price }}&nbsp;zł</div>
            <!-- <p class="mt-1 text-sm text-emerald-600">Dostępny</p> -->
          </div>
        </div>

        <!-- Badges -->
        <!-- <div class="mt-3 flex flex-wrap gap-2">
          <span class="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700">Bestseller</span>
          <span class="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700">Dostawa gratis</span>
        </div> -->

        <!-- Rating -->
        <!-- <div class="mt-4 flex items-center gap-2">
          <div class="flex text-amber-400" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-slate-300"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </div>
          <span class="text-sm text-slate-600">4.0 · 87 opinii</span>
        </div> -->

        <!-- Short description -->
        <p class="mt-6 text-slate-700 leading-relaxed">{{ product?.description }}</p>

        <!-- Options (variants) -->
        <!-- <div class="mt-6">
          <h2 class="text-sm font-medium text-slate-800 mb-2">Wariant</h2>
          <div class="flex flex-wrap gap-2">
            <span class="rounded-xl border px-3 py-2 text-sm border-slate-900 bg-slate-900 text-white">Standard</span>
            <span class="rounded-xl border px-3 py-2 text-sm border-slate-300">Pro</span>
          </div>
        </div> -->

        <!-- Qty + Add to cart (static) -->
        <div class="mt-8 flex items-stretch gap-3">
          <label class="sr-only" for="qty">Amount</label>
          <input id="qty" type="number" min="1" value="1" class="h-12 w-24 rounded-xl border border-slate-300 px-3 text-center text-base"/>
          <button type="button" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold shadow-sm">Add to cart</button>
        </div>

        <!-- Trust / shipping -->
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

        <!-- Tabs (CSS-only, radio + peer) -->
        <!-- <div class="mt-10">
          <div class="flex gap-2 border-b border-slate-200">
            <label for="tab-desc" class="cursor-pointer px-4 py-3 text-sm font-medium -mb-px border-b-2 peer-checked/tab-desc:border-slate-900 peer-checked/tab-desc:text-slate-900 text-slate-500">Opis</label>
            <label for="tab-specs" class="cursor-pointer px-4 py-3 text-sm font-medium -mb-px border-b-2 text-slate-500">Specyfikacja</label>
            <label for="tab-rev" class="cursor-pointer px-4 py-3 text-sm font-medium -mb-px border-b-2 text-slate-500">Opinie</label>
          </div>


          <div class="sr-only">
            <input type="radio" name="tabs" id="tab-desc" class="peer/tab-desc" checked>
            <input type="radio" name="tabs" id="tab-specs" class="peer/tab-specs">
            <input type="radio" name="tabs" id="tab-rev" class="peer/tab-rev">
          </div>


          <div class="pt-6">
            <div class="[&:has(~.sr-only>.peer/tab-desc:checked)]:block hidden prose prose-slate max-w-none">
              <p>Pełny opis produktu. Wydajny filtr z regulacją przepływu. W zestawie media filtracyjne. Pobór mocy: 5W.</p>
            </div>
            <div class="[&:has(~.sr-only>.peer/tab-specs:checked)]:block hidden not-prose">
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div class="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt class="text-slate-500">Przepływ</dt><dd class="text-slate-900 font-medium">200 l/h</dd></div>
                <div class="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt class="text-slate-500">Pobór mocy</dt><dd class="text-slate-900 font-medium">5 W</dd></div>
                <div class="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt class="text-slate-500">Do akwarium</dt><dd class="text-slate-900 font-medium">50–100 l</dd></div>
                <div class="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt class="text-slate-500">Gwarancja</dt><dd class="text-slate-900 font-medium">24 miesiące</dd></div>
              </dl>
            </div>
            <div class="[&:has(~.sr-only>.peer/tab-rev:checked)]:block hidden not-prose">
              <div class="rounded-xl border border-slate-200 p-6">
                <p class="text-slate-600">Brak opinii? Bądź pierwszy!</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <!-- Related products (static placeholders) -->
    <!-- <section aria-labelledby="related-heading" class="mt-16">
      <h2 id="related-heading" class="text-xl font-semibold text-slate-900">Powiązane produkty</h2>
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <a href="#" class="group rounded-2xl border border-slate-200 p-4 hover:shadow-sm">
          <div class="aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
            <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format&fit=crop" alt="Related product" class="h-full w-full object-contain"/>
          </div>
          <div class="mt-3 flex items-center justify-between gap-2">
            <h3 class="text-slate-800 font-medium group-hover:text-slate-900">Produkt A</h3>
            <span class="text-slate-900 font-semibold">59,99&nbsp;zł</span>
          </div>
        </a>
        <a href="#" class="group rounded-2xl border border-slate-200 p-4 hover:shadow-sm">
          <div class="aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
            <img src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600&auto=format&fit=crop" alt="Related product" class="h-full w-full object-contain"/>
          </div>
          <div class="mt-3 flex items-center justify-between gap-2">
            <h3 class="text-slate-800 font-medium group-hover:text-slate-900">Produkt B</h3>
            <span class="text-slate-900 font-semibold">89,99&nbsp;zł</span>
          </div>
        </a>
        <a href="#" class="group rounded-2xl border border-slate-200 p-4 hover:shadow-sm">
          <div class="aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
            <img src="https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=600&auto=format&fit=crop" alt="Related product" class="h-full w-full object-contain"/>
          </div>
          <div class="mt-3 flex items-center justify-between gap-2">
            <h3 class="text-slate-800 font-medium group-hover:text-slate-900">Produkt C</h3>
            <span class="text-slate-900 font-semibold">39,99&nbsp;zł</span>
          </div>
        </a>
        <a href="#" class="group rounded-2xl border border-slate-200 p-4 hover:shadow-sm">
          <div class="aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
            <img src="https://images.unsplash.com/photo-1420593248178-d88870618ca0?q=80&w=600&auto=format&fit=crop" alt="Related product" class="h-full w-full object-contain"/>
          </div>
          <div class="mt-3 flex items-center justify-between gap-2">
            <h3 class="text-slate-800 font-medium group-hover:text-slate-900">Produkt D</h3>
            <span class="text-slate-900 font-semibold">69,99&nbsp;zł</span>
          </div>
        </a>
      </div>
    </section> -->
  </section>
  </div>

</template>
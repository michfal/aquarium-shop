<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js'
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue';
import NewsLetter from '@/components/NewsLetter.vue';
import MainHeading from '@/components/MainHeading.vue';

const categories = ref(['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6']);
const products = ref(['prod1', 'prod2', 'prod3']);
defineProps<{
  title?: string
}>();

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

type Product = { id: string; name: string; price: number } // opcjonalnie

const products2 = ref<Product[]>([])
const loading = ref(true)
const errorMsg = ref<string | null>(null)

onMounted(async () => {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.error('Błąd pobierania produktów:', error)
    errorMsg.value = error.message
  } else {
    console.log('Produkty z bazy:', data) // <= Twój console.log
    products2.value = data ?? []
  }
  loading.value = false
})
</script>

<template>
  <MainHeading title="Aqua-Shop" subtitle="The best aquarium products in one place."/>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Categories</h1>
    <div class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <CategoryCard v-for="c in categories" :key="c"/>
    </div>
  </section>
  <section class="py-9 px-5">
    <h1 class="font-heading text-2xl text-center pb-5">Recommended</h1>
    <div class="max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <ProductCard v-for="p in products" :key="p"/>
    </div>
  </section>
  <NewsLetter />

</template>
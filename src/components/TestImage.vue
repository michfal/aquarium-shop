<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/api/supabase'


const BUCKET = 'product-images'

const urls = ref<{ src: string; name: string }[]>([])
const loading = ref(true)
const errorMsg = ref<string | null>(null)

async function loadMainImages() {
  const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 100 })
  if (error) throw error
  if (!data) return []

  const exts = ['png', 'jpg', 'jpeg', 'webp', 'gif']

  const promises = data
    .filter(item => !item.id) // foldery
    .map(async (folder) => {
      for (const ext of exts) {
        const path = `${folder.name}/main.${ext}`
        const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60)
        if (data?.signedUrl) {
          return { src: data.signedUrl, name: folder.name }
        }
      }
      return null
    })

  const results = await Promise.all(promises)
  return results.filter((item): item is { src: string; name: string } => item !== null)
}

onMounted(async () => {
  try {
    urls.value = await loadMainImages()
  } catch (e: any) {
    errorMsg.value = e?.message ?? String(e)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div class="p-4">
    <p v-if="loading">Ładowanie obrazków…</p>
    <p v-else-if="errorMsg" class="text-red-600">Błąd: {{ errorMsg }}</p>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="item in urls" :key="item.src" class="text-center">
        <img :src="item.src" :alt="item.name"
             class="w-full h-auto object-contain border rounded-lg" />
        <p class="mt-2 text-sm text-gray-600">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

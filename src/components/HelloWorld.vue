<script setup lang="ts">
const props = withDefaults(defineProps<{
  msg?: string
}>(), {
  msg: 'testtest'
})
</script>

<template>
  <h1 class="text-3xl font-black">{{ msg }}</h1>
</template>


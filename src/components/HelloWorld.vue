<script setup lang="ts">
const props = withDefaults(defineProps<{
  msg?: string
}>(), {
  msg: 'testtest'
})
</script>

<template>
  <h1 class="green">{{ msg }}</h1>
</template>


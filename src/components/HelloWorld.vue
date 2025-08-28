<script setup lang="ts">
// const props = withDefaults(defineProps<{
//   msg?: string
// }>(), {
//   msg: 'testtest'
// })

  defineProps({
    msg: {
      type: String,
      default: 'Become a Vue dev'
    },
    subtitle: {
      type: String,
      default: 'Find the Vue job that fits your skills and needs'
    }
  })
</script>

<template>
  <h1 class="text-3xl font-black">{{ msg }}</h1>
</template>


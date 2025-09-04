<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNavbar from './components/MainNavbar.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<template>
  <MainNavbar />
  <RouterView />
  <MainFooter />
</template>

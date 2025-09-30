<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNavbar from './components/MainNavbar.vue';
import MainFooter from './components/MainFooter.vue';
import TestImage from './components/TestImage.vue';
</script>

<template>
  <MainNavbar />
  <!-- <TestImage /> -->
  <RouterView />
  <MainFooter />
</template>

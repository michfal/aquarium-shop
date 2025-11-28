import './assets/main.css';
import router from './router';
import { createApp } from 'vue';
import App from './App.vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
} as ToastContainerOptions)
app.mount('#app');

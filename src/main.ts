import './assets/main.css'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})

const app = createApp(App)
app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')

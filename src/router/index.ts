import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue';
import CategoryView from "@/views/CategoryView.vue";
import FaqView from "@/views/FaqView.vue";
import TermsView from "@/views/TermsView.vue";
import ContactView from "@/views/ContactView.vue";
import ProductView from "@/views/ProductView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories/:id',
      name: 'categories',
      component: CategoryView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/terms',
      name: 'terms and conditions',
      component: TermsView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView
    },
  ]
})

export default router
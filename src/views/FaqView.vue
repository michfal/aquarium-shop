<script setup lang="ts">
import { reactive } from 'vue'

const faqs = reactive([
  {
    question: 'How long does shipping take?',
    answer:
      'Orders are typically processed within 1–2 business days. Delivery within Poland usually takes 2–5 business days depending on your location.',
    open: false
  },
  {
    question: 'Can I return a product?',
    answer:
      'Yes, you can return any unused product within 14 days of delivery. Please ensure it’s in its original packaging and contact our support team first.',
    open: false
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Currently, we only deliver within the European Union. We plan to expand international shipping soon.',
    open: false
  },
  {
    question: 'Are live plants or animals included in shipping?',
    answer:
      'We only ship live plants under specific conditions to ensure their safety. We do not ship live animals at this time.',
    open: false
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit cards, PayPal, and secure bank transfers. All transactions are encrypted for your safety.',
    open: false
  }
])

function toggle(index: number): void {
  faqs[index].open = !faqs[index].open
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 class="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
      <p class="text-gray-600 text-center mb-10">
        Find quick answers to common questions about our store, products, and shipping.
      </p>

      <div class="divide-y divide-gray-200">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="py-4"
        >
          <button
            @click="toggle(i)"
            class="w-full flex justify-between items-center text-left"
          >
            <span class="text-lg font-medium text-gray-900">
              {{ faq.question }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5 text-gray-500 transform transition-transform duration-200"
              :class="{ 'rotate-180': faq.open }"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition name="fade">
            <div v-if="faq.open" class="mt-3 text-gray-600 leading-relaxed">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>

      <div class="mt-12 border-t pt-8 text-center">
        <p class="text-gray-600">
          Still need help? Contact us at
          <a href="mailto:support@aquashop.com" class="text-blue-600 underline">
            support@aquashop.com
          </a>
        </p>
        <button
          class="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          @click="$router.push('/')"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

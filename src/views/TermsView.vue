<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 class="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p class="text-sm text-gray-500 mb-10 text-center">
        Last updated: October 20, 2025
      </p>

      <section class="space-y-8">
        <div>
          <h2 class="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to our online aquarium store. By accessing or using our website,
            you agree to comply with and be bound by the following terms and conditions.
            Please read them carefully before using our services.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">2. Use of the Website</h2>
          <p>
            You agree to use this website only for lawful purposes and in a manner that does
            not infringe the rights of, or restrict or inhibit the use and enjoyment of,
            this website by any third party.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">3. Products and Orders</h2>
          <p>
            All products displayed on our website are subject to availability. We reserve
            the right to limit the quantity of any items that you may purchase and to refuse
            any order for any reason at our discretion.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">4. Prices and Payments</h2>
          <p>
            All prices are listed in EUR and include applicable taxes unless otherwise stated.
            We reserve the right to change prices at any time without prior notice.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">5. Shipping and Delivery</h2>
          <p>
            We aim to process and ship orders as quickly as possible. Delivery times may vary
            depending on location and availability. We are not responsible for delays caused
            by carriers or unforeseen circumstances.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">6. Returns and Refunds</h2>
          <p>
            If you are not satisfied with your purchase, you may return the product within
            14 days of receipt, provided it is unused and in its original packaging. Please
            contact us before returning any items.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">7. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy for information
            about how we collect, use, and protect your personal data.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">8. Changes to These Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. Any changes will be
            posted on this page with the updated date above. Your continued use of the website
            constitutes acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:<br />
            <a href="mailto:support@aquashop.com" class="text-blue-600 underline">
              support@aquashop.com
            </a>
          </p>
        </div>
      </section>

      <div class="mt-10 text-center">
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          @click="$router.push('/')"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

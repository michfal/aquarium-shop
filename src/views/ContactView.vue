<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 class="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p class="text-gray-600 text-center mb-10">
        Have questions about our products, shipping, or aquarium care? We're here to help!
      </p>

      <div class="grid md:grid-cols-2 gap-10">
        <!-- Contact Information -->
        <div class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold mb-2">Our Address</h2>
            <p>
              Aquashop Sp. z o.o.<br />
              12 Ocean Street<br />
              80-001 Gdańsk, Poland
            </p>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-2">Email</h2>
            <p>
              <a href="mailto:support@aquashop.com" class="text-blue-600 underline">
                support@aquashop.com
              </a>
            </p>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-2">Phone</h2>
            <p>
              <a href="tel:+48123456789" class="text-blue-600 underline"> +48 123 456 789 </a>
            </p>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-2">Opening Hours</h2>
            <p>
              Monday – Friday: 9:00 – 18:00<br />
              Saturday: 10:00 – 16:00<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <!-- Map / Image Section -->
        <div class="flex flex-col justify-center">
          <div class="rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Gdańsk,Poland&zoom=13&size=600x400&maptype=roadmap&key=YOUR_API_KEY"
              alt="Map of Aquashop location"
              class="w-full h-64 object-cover"
            />
          </div>
          <p class="text-sm text-gray-500 text-center mt-3">Find us in the heart of Gdańsk!</p>
        </div>
      </div>

      <div class="mt-12 border-t pt-8 text-center">
        <p class="text-gray-600">
          Prefer to visit us in person? We’d love to meet you and help you choose the perfect setup
          for your aquarium.
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

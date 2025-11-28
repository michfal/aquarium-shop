<script setup lang="ts"></script>

<template>
  <section
    class="relative bg-gradient-to-b from-cyan-600 to-cyan-800 text-white py-16 px-4 text-center bg-[url(@/assets/img/waves.png)] sm:h-100 flex flex-column items-center"
  >
    <div class="relative z-10 max-w-2xl mx-auto">
      <h2 class="text-2xl md:text-4xl font-bold mb-4 text-white">
        DOŁĄCZ DO NASZEJ <br />
        SPOŁECZNOŚCI AKWARYSTÓW
      </h2>
      <p class="text-lg mb-6">Dołącz do naszej społeczności akwarystów</p>

      <form class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="email"
          placeholder="Twój adres e-mail"
          class="px-4 py-3 rounded-md text-gray-900 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
        />
        <button
          type="submit"
          class="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          ZAPISZ SIĘ
        </button>
      </form>
    </div>
  </section>
</template>

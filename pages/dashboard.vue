<template>
  <div class="h-screen bg-white dark:bg-black">
    <div
      class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block dark:text-white">Welcome to the dasboard!</span>
        <span class="block text-green-600"
          >Ask your question
          <span v-if="user" class="text-black dark:text-white">
            {{ user.username }}</span
          >.</span
        >
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <nuxt-link
            to="/ask-question/search"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-5 py-3 text-base dark:text-white font-medium text-white hover:bg-green-700"
            >Ask question</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
const user = await useUser()
</script>

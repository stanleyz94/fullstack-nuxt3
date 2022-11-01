<template>
  <div class="min-h-full theme-mode from-white to-green-200 dark:bg-black">
    <div class="h-32 flex justify-center">
      <div class="flex m-5">
        <h1
          class="py-9 text-center text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4"
        >
          Ask Question
        </h1>
      </div>
    </div>
    <div class="container mx-auto">
      <!-- <div
        ref="el"
        class="flex flex-col gap-2 p-4 w-300px h-48 m-auto overflow-y-scroll bg-gray-500/5 rounded"
      >
        <div
          v-for="item in data"
          :key="item"
          class="h-30 bg-gray-500/5 rounded p-3 text-white"
        >
          {{ item }}
        </div>
      </div> -->
      <QuestionSidebar />
      <QuestionBoard />
    </div>
  </div>
</template>
<script setup lang="ts">
import QuestionBoard from '@/components/question/QuestionBoard.vue'
import QuestionSidebar from '@/components/question/QuestionSidebar.vue'
definePageMeta({
  middleware: 'auth',
})
</script>

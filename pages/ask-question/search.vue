<template>
    <div
      class="min-h-full theme-mode from-white to-green-200 dark:bg-black/95">
      <div class="h-32 flex justify-center">
        <div class="flex m-5">
          <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="Question Board logo" />
          <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
            Ask Question
          </h1>
        </div>
      </div>
      <div class="md:flex min-h-full">
  
        <AskQuestionSideBar />
        <div class="md:w-1/3 z-1 flex justify-right relative"></div>
        <QuestionBoard />
      </div>
    </div>
</template>
 <script setup lang="ts">
import QuestionBoard from '@/components/elements/QuestionBoard.vue'
import AskQuestionSideBar from '@/components/elements/AskQuestionSidebar.vue'
definePageMeta({
    middleware: 'auth'
})
 </script>
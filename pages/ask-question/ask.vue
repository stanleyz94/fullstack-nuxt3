<template>
  <div class="theme-mode from-white to-green-200 dark:bg-black">
    <div class="h-32 flex justify-center">
      <div class="flex m-5">
        <h1
          class="py-9 text-center text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4"
        >
          Ask Question
        </h1>
      </div>
    </div>
    <div class="md:flex">
      <div class="md:w-1/3 z-1 flex justify-right relative"></div>
      <div class="w-full md:w-1/3 h-screen">
        <QuestionForm :data="data" :endpoint="endpoint" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionForm from '@/components/question/QuestionForm.vue'
import { IQuestionPost } from '@/types/IQuestionPost'

definePageMeta({
  middleware: 'auth',
})

const data: IQuestionPost = reactive({
  title: '',
  description: '',
})

const endpoint = '/api/ask-question/ask'
</script>

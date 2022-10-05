<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900 -mt-1 dark:text-white">
        @{{ question.author.username }}
      </h2>
    </div>
    <p class="text-gray-700 dark:text-white break-all">
      Title: {{ question.title }}
    </p>
    <p class="mt-3 text-gray-700 dark:text-white text-sm break-all">
      {{ question.description }}
    </p>
    <div class="mt-4 flex items-center">
      <div class="flex text-gray-700 dark:text-white text-sm mr-8">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          class="w-4 h-4 mr-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
        <span>{{ question.answers.length }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IQuestion } from '@/types/IQuestion'

interface QuestionModalProps {
  question: IQuestion
  isAnswer: boolean
}

const props = withDefaults(defineProps<QuestionModalProps>(), {
  isAnswer: false,
})
</script>

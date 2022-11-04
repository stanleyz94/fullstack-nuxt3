<template>
  <div
    class="flex bg-white shadow-lg rounded-lg mx-auto my-10 max-w-md md:max-w-2xl"
    :class="type === 'question' ? 'dark:bg-neutral-800' : 'dark:bg-neutral-900'"
  >
    <div class="flex items-start px-4 py-6 w-full">
      <svg
        class="w-12 h-12 rounded-full mr-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#4ade80"
      >
        <g><rect fill="none" height="24" width="24" /></g>
        <g>
          <path
            d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,6c1.93,0,3.5,1.57,3.5,3.5S13.93,13,12,13 s-3.5-1.57-3.5-3.5S10.07,6,12,6z M12,20c-2.03,0-4.43-0.82-6.14-2.88C7.55,15.8,9.68,15,12,15s4.45,0.8,6.14,2.12 C16.43,19.18,14.03,20,12,20z"
          />
        </g>
      </svg>
      <div class="w-full">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 -mt-1 dark:text-white">
            @{{ post.author.username }}
          </h2>
        </div>
        <p
          v-if="type === 'question'"
          class="text-gray-700 dark:text-white break-all"
        >
          Title: {{ post.title }}
        </p>
        <p class="mt-3 text-gray-700 dark:text-white text-sm break-all">
          {{ post.description }}
        </p>
        <div class="mt-4 flex items-center">
          <div
            v-if="type === 'question'"
            class="flex text-gray-700 dark:text-white text-sm mr-8"
          >
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
            <span>{{ post.numberOfAnswers }}</span>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IQuestion } from '@/types/IQuestion'
import { IAnswer } from '@/types/IAnswer'

interface QuestionBoxProps {
  post: IQuestion | IAnswer
  type: string
}

const props = withDefaults(defineProps<QuestionBoxProps>(), {
  type: 'question',
})

const isQuestion = (
  post: QuestionBoxProps['post'],
  key: string
): post is IQuestion => {
  return typeof (post as IQuestion)[key] !== 'undefined'
}

const post = computed(() => ({
  ...props.post,
  title: isQuestion(props.post, 'title') ? props.post.title : '',
  description: isQuestion(props.post, 'description')
    ? props.post.description
    : props.post.text,
  numberOfAnswers: isQuestion(props.post, 'answers')
    ? props.post.answers.length
    : 0,
}))
</script>

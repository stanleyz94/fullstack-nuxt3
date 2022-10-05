<template>
  <div class="w-full md:w-1/3">
    <div>
      <div class="flex m-5">
        <label
          for="search-dropdown"
          class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-gray-300"
          >Search Questions</label
        >
        <div class="relative w-full">
          <input
            id="search-dropdown"
            v-model="searchInput"
            type="search"
            class="block p-2.5 w-full z-20 text-sm text-slate-900 border-solid bg-slate-50 rounded-lg border-solid border-2 border-teal-600 dark:bg-neutral-900 dark:text-gray-300"
            placeholder="Search Questions..."
          />
          <button
            type="submit"
            class="absolute top-0 right-0 p-2.5 text-sm font-medium dark:text-white"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    {{ pending }}
    <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-slate-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
              <div class="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
    <TransitionGroup
      tag="ul"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
    >
      <li v-for="(question, index) in questions" :key="index">
        <NuxtLink
          v-if="question"
          class="flex flex-column justify-center"
          :to="`/ask-question/question/${question.id}`"
        >
          <div class="max-w-xxl w-full p-4">
            <div class="p-8 bg-white dark:bg-neutral-800 rounded shadow-md">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-300">
                {{ question.title }}
              </h2>
              <p class="dark:text-gray-300">{{ question.description }}</p>
            </div>
          </div>
        </NuxtLink>
      </li>
    </TransitionGroup>
    <!-- <Transition
        v-for="(question, index) in questions"
        v-if="!pending"
        :key="index"
        name="fade"
      >
        <NuxtLink
          v-if="question"
          class="flex flex-column justify-center"
          :to="`/ask-question/question/${question.id}`"
        >
          <div class="max-w-xxl w-full p-4">
            <div class="p-8 bg-white dark:bg-neutral-800 rounded shadow-md">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-300">
                {{ question.title }}
              </h2>
              <p class="dark:text-gray-300">{{ question.description }}</p>
            </div>
          </div>
        </NuxtLink>
      </Transition> -->
  </div>
</template>

<script setup lang="ts">
import { IQuestion } from '@/types/IQuestion'
import { useDebounceOnRef } from '@/composables/useDebounce'

const searchInput = useDebounceOnRef('', 1000)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data: questions, pending } = await useFetch<IQuestion[]>(
  () => `/api/ask-question/search?search=${searchInput.value}`
)
</script>

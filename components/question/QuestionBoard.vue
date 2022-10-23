<template>
  <div class="test">
    <div class="flex m-5 justify-center">
      <label
        for="search-dropdown"
        class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-gray-300"
        >Search Questions</label
      >
      <div class="w-3/4">
        <input
          id="search-dropdown"
          v-model="searchInput"
          type="search"
          class="block p-2.5 w-full z-20 text-sm text-slate-900 bg-slate-50 rounded-lg border-solid border-2 border-teal-600 dark:bg-neutral-900 dark:text-gray-300"
          placeholder="Search Questions..."
        />
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
      <li v-for="(question, index) in questions?.result" :key="index">
        <NuxtLink v-if="question" :to="`/ask-question/question/${question.id}`">
          <QuestionBox :post="question" type="question" />
        </NuxtLink>
      </li>
    </TransitionGroup>
    <div
      class="flex flex-col gap-2 p-4 w-300px h-48 m-auto overflow-y-scroll bg-gray-500/5 rounded"
    >
      <div
        v-for="item in data"
        :key="item"
        class="h-30 bg-gray-500/5 rounded p-3 text-white"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import QuestionBox from './QuestionBox.vue'
import { ISearch } from '@/types/ISearch'
import { useDebounceOnRef } from '@/composables/useDebounce'

const data = ref(Array.from(Array(100).keys()))

const searchInput = useDebounceOnRef('', 1000)

const { data: questions, pending } = await useFetch<ISearch>(
  () => `/api/ask-question/search?search=${searchInput.value}`,
  {
    server: false,
    params: {
      take: 4,
    },
  }
)

const infiniteScrollContainer = ref<Document>(null)

useInfiniteScroll(
  infiniteScrollContainer,
  () => {
    // load more
    console.log('fetch another data')
    data.value.push(...Array.from({ length: 5 }, (_, i) => length + i))
  },
  { distance: 10 }
)

onMounted(() => {
  infiniteScrollContainer.value = window.document
})
</script>

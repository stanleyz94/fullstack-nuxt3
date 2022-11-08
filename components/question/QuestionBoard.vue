<template>
  <div>
    <div
      class="flex flex-col m-5 justify-center items-center gap-5 max-w-md md:max-w-2xl mx-auto my-10"
    >
      <div class="w-3/4">
        <label
          for="search-dropdown"
          class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-gray-300"
          >Search Questions</label
        >
        <input
          id="search-dropdown"
          v-model="searchInput"
          type="search"
          class="block p-2.5 w-full z-20 text-sm text-slate-900 bg-slate-50 rounded-lg border-solid border-2 border-teal-600 dark:bg-neutral-900 dark:text-gray-300"
          placeholder="Search Questions..."
        />
      </div>
      <NuxtLink
        to="/ask-question/ask"
        type="button"
        class="w-3/4 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Ask Question
      </NuxtLink>
    </div>
    <div></div>
    <ul class="pb-2">
      <li v-for="question in questions.result" :key="question.id">
        <NuxtLink v-if="question" :to="`/ask-question/question/${question.id}`">
          <QuestionBox :post="question" type="question" />
        </NuxtLink>
      </li>
      <template v-if="pending">
        <li
          v-for="(placeholder, index) in placeholderArray"
          :key="`{${placeholder}-${index}`"
        >
          <QuestionSkeletonBox />
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { type UseFetchOptions } from '#app'
import { type FetchOptions } from 'ohmyfetch'
import QuestionBox from './QuestionBox.vue'
import QuestionSkeletonBox from './QuestionSkeletonBox.vue'
import { ISearch } from '@/types/ISearch'
import { useDebounceOnRef } from '@/composables/useDebounce'
const searchInput = useDebounceOnRef('', 1000)

const placeholderArray = Array.from(Array(4).keys())

const questions = reactive<ISearch>({
  result: [],
  meta: {
    nextCursor: '',
    searchedWord: '',
  },
})
const assignNewQuestions = (newQuestions: ISearch) => {
  const newResults = newQuestions.result || []
  const searchedWordIsNotSame =
    searchInput.value !== questions.meta?.searchedWord
  if (searchedWordIsNotSame) {
    questions.result.splice(0, questions.result.length, ...newResults)
  } else {
    questions.result.push(...newResults)
  }
  questions.meta.searchedWord = newQuestions.meta?.searchedWord || ''
  questions.meta.nextCursor = newQuestions.meta?.nextCursor || ''
}
const assignCursor = (options: FetchOptions) => {
  const searchedWordIsNotSame =
    searchInput.value !== questions.meta?.searchedWord
  if (searchedWordIsNotSame) {
    options.params.cursor = ''
  } else {
    options.params.cursor = questions.meta.nextCursor
  }
}

const searchOptions: UseFetchOptions<ISearch> = {
  server: false,
  params: {
    take: 4,
  },
  initialCache: false,
}
const searchInterceptors: UseFetchOptions<ISearch> = {
  onRequest({ options }) {
    assignCursor(options)
  },
  onResponse({ response }) {
    assignNewQuestions(response._data)
  },
}

const { pending, refresh } = await useFetch<ISearch>(
  () => `/api/ask-question/search?search=${searchInput.value}`,
  {
    ...searchOptions,
    ...searchInterceptors,
  }
)
const infiniteScrollContainer = ref<Document>(null)

useInfiniteScroll(
  infiniteScrollContainer,
  () => {
    if (questions.meta?.nextCursor) {
      refresh({
        _initial: false,
      })
    }
  },
  { distance: 10 }
)

onMounted(() => {
  infiniteScrollContainer.value = window.document
})
</script>

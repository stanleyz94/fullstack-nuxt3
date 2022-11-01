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
    <TransitionGroup
      name="list"
      tag="ul"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-200"
      leave-active-class="transition duration-200"
    >
      <li v-for="question in questions.result" :key="question.id">
        <NuxtLink v-if="question" :to="`/ask-question/question/${question.id}`">
          <QuestionBox :post="question" type="question" />
        </NuxtLink>
      </li>
      <li
        v-for="(placeholder, index) in Array.from(Array(4).keys())"
        :key="`{${placeholder}-${index}`"
      >
        <QuestionSkeletonBox />
      </li>
    </TransitionGroup>
    <div class="text-white">{{ pending }}</div>
    <!-- <TransitionGroup
      tag="ul"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-200"
      leave-active-class="transition duration-200"
    >
      <li
        v-for="(question, index) in questions.result"
        :key="`${question.id}-${index}`"
      >
        <NuxtLink v-if="question" :to="`/ask-question/question/${question.id}`">
          <QuestionBox :post="question" type="question" />
        </NuxtLink>
      </li>
      <template v-if="pending">
        <li
          v-for="(placeholder, index) in Array.from(Array(4).keys())"
          :key="`{${placeholder}-${index}`"
        >
          <QuestionSkeletonBox />
        </li>
      </template>
    </TransitionGroup> -->
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import type { UseFetchOptions } from '#app'
import QuestionBox from './QuestionBox.vue'
import QuestionSkeletonBox from './QuestionSkeletonBox.vue'
import { ISearch } from '@/types/ISearch'
import { useDebounceOnRef } from '@/composables/useDebounce'
const searchInput = useDebounceOnRef('', 1000)

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

const searchOptions: UseFetchOptions<ISearch> = {
  server: false,
  params: {
    take: 4,
  },
  initialCache: false,
}
const searchInterceptors: UseFetchOptions<ISearch> = {
  onResponse({ response }) {
    assignNewQuestions(response._data)
  },
}

const { pending, refresh } = await useFetch<ISearch>(
  () =>
    `/api/ask-question/search?search=${searchInput.value}&cursor=${questions.meta.nextCursor}`,
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

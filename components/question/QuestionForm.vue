<template>
  <form>
    <div class="my-6">
      <label
        for="title"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Short Description</label
      >
      <input
        id="title"
        v-model="data.title"
        type="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
        placeholder="Title"
      />
    </div>
    <div>
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Question</label
      >
      <textarea
        id="message"
        v-model="data.description"
        rows="4"
        class="lock p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Question description"
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
        type="button"
        class="mt-5 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="postQuestion"
      >
        Ask Question
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { IQuestionPost } from '@/types/IQuestionPost'
import { IQuestion } from '@/types/IQuestion'

definePageMeta({
  middleware: 'auth',
})

interface Props {
  data: IQuestionPost
  endpoint?: string
}

const props = defineProps<Props>()
const data = reactive({ ...props.data })
const emit = defineEmits(['closeEditForm'])
const router = useRouter()

const postQuestion = async () => {
  const { data: question } = await useFetch<IQuestion>(
    () => `${props.endpoint}`,
    { method: 'POST', body: { data }, pick: ['id'], key: data.title }
  )
  emit('closeEditForm')
  router.push(`/ask-question/question/${question.value?.id}`)
}
</script>

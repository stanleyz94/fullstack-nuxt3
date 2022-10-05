<template>
  <form @submit.prevent="postAnswer">
    <label
      for="message"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >Answer</label
    >
    <textarea
      id="message"
      v-model="data.text"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
      placeholder="Question description"
    >
    </textarea>
    <div></div>
    <div class="flex justify-end">
      <button
        type="button"
        class="mt-5 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="postAnswer"
      >
        Submit
      </button>
      <button
        type="button"
        class="mt-5 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="showAnswerForm = !showAnswerForm"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { IAnswer } from '@/types/IAnswer'
import { IAnswerPost } from '@/types/IAnswerPost'

const props = defineProps({
  questionId: String,
})
const emit = defineEmits<{ (e: 'addAnswer', answer: IAnswer) }>()
const data: IAnswerPost = reactive({
  text: '',
  questionId: parseInt(props.questionId),
})
const showAnswerForm = useState('showAnswerForm' + props.questionId)
const postAnswer = async () => {
  const answer = await useFetch(() => `/api/ask-question/answer`, {
    method: 'post',
    body: { data },
  })
  const newAnswer = useState('newAnswer')
  newAnswer.value = answer.data.value
  emit('addAnswer', newAnswer.value as IAnswer)
  data.text = ''
}
</script>

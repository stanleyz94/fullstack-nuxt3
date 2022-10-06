<template>
  <div class="theme-mode from-white to-green-200 dark:bg-black">
    <div class="h-32 flex justify-center">
      <div class="flex m-5">
        <h1
          class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4"
        >
          Ask Question
        </h1>
      </div>
    </div>
    <QuestionSidebar />
    <div class="container mx-auto">
      <QuestionBox :post="question" type="question">
        <div v-if="isMine && showEditForm === false" class="mt-5">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="showEditForm = true"
          >
            Edit
          </button>
          <button
            class="bg-red-500 ml-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="deleteQuestion"
          >
            Delete
          </button>
        </div>
        <QuestionForm
          v-if="showEditForm"
          :endpoint="editEndpoint"
          :data="question"
          @closeEditForm="closeEditForm"
        />
      </QuestionBox>
      <QuestionBox
        v-for="(answer, index) in question.answers"
        :key="index"
        :post="answer"
        type="answer"
      />
      <div class="max-w-md md:max-w-2xl mx-auto flex flex-col">
        <button
          v-if="!showAnswerForm"
          type="button"
          class="text-white bg-gradient-to-r from-green-500 to-green-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          @click="showAnswerForm = !showAnswerForm"
        >
          Answer
        </button>
        <QuestionAnswerForm
          v-else
          :question-id="questionId"
          @addAnswer="addAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAnswer } from '@/types/IAnswer'
import { IQuestion } from '@/types/IQuestion'
import QuestionSidebar from '~/components/question/QuestionSidebar.vue'
import QuestionAnswerForm from '~/components/question/QuestionAnswerForm.vue'
import QuestionForm from '~~/components/question/QuestionForm.vue'
import QuestionBox from '~/components/question/QuestionBox.vue'
// refactoring potrzebny!!!!!
const route = useRoute()
const router = useRouter()
const questionId = route.params?.id as string

if (!questionId) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const showEditForm = ref(false)
const showAnswerForm = useState('showAnswerForm' + questionId, () => false)
const closeEditForm = () => (showEditForm.value = false)

const getQuestion = async () => {
  try {
    return await $fetch<IQuestion>(
      `/api/ask-question/question?id=${questionId}`
    )
  } catch (e) {
    const statusCode = e.response?.status
    const statusMessage =
      statusCode === 404 ? 'Page Not Found' : e.response?.statusText
    throw createError({ statusCode, statusMessage })
  }
}

const deleteQuestion = async () => {
  await useFetch('/api/ask-question/delete-question', {
    method: 'POST',
    body: { questionId },
  })
  router.push('/ask-question/search')
}

const addAnswer = (answer: IAnswer) => {
  question.answers.push(answer)
  showAnswerForm.value = false
}

const question = await getQuestion()
const me = await useUser()
const isMine = question.authorId === me.id
const editEndpoint = '/api/ask-question/edit-question'
</script>

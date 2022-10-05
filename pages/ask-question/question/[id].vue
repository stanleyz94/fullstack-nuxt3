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
      <div
        v-if="question"
        class="flex dark:bg-neutral-800 bg-white shadow-lg rounded-lg mx-auto my-10 max-w-md md:max-w-2xl"
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
              <h2
                class="text-lg font-semibold text-gray-900 -mt-1 dark:text-white"
              >
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
          </div>
        </div>
      </div>
      <div
        v-for="(answer, index) in question.answers"
        :key="index"
        class="flex dark:bg-neutral-900 bg-white shadow-lg rounded-lg mx-auto my-10 max-w-md md:max-w-2xl"
      >
        <!--horizantil margin is just for display-->
        <div class="flex items-start px-4 py-6 w-full">
          <svg
            class="w-12 h-12 rounded-full mr-4"
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
          <div>
            <div class="flex items-center justify-between">
              <h2
                class="text-lg font-semibold text-gray-900 -mt-1 dark:text-white"
              >
                @{{ answer.author.username }}
              </h2>
            </div>
            <p class="mt-3 text-gray-700 dark:text-white text-sm">
              {{ answer.text }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          v-if="!showAnswerForm"
          type="button"
          class="text-white bg-gradient-to-r from-green-500 to-green-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          @click="showAnswerForm = !showAnswerForm"
        >
          Answer
        </button>
      </div>
      <template v-if="showAnswerForm">
        <QuestionAnswerForm
          class="max-w-md md:max-w-2xl mx-auto"
          :question-id="questionId"
          @addAnswer="addAnswer"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAnswer } from '@/types/IAnswer'
import { IQuestion } from '@/types/IQuestion'
import QuestionSidebar from '~/components/question/QuestionSidebar.vue'
import QuestionAnswerForm from '~/components/question/QuestionAnswerForm.vue'
import QuestionForm from '~~/components/question/QuestionForm.vue'
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
console.log({ question })
</script>

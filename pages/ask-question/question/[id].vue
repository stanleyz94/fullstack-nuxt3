<template>

    <div
     class=" min-h-full theme-mode from-white to-teal-200 dark:bg-black/95">
     <div class="h-32 flex justify-center">
      <div class="flex m-5">
       <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="Question Board logo" />
       <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
        Ask Question
       </h1>
      </div>
     </div>
     <div class="md:flex">
      <AskQuestionSidebar />
      <div class="md:w-1/3 z-1 flex justify-right relative"></div>
      <div class="w-full md:w-1/3">
       <div class="p-8 text-white bg-lime-600 dark:bg-black/95 rounded shadow-md" v-if="showDeleted">
        question deleted
       </div>
       <div v-if="question" class="flex flex-column justify-center">
        <div class="max-w-xxl w-full p-4">
         <div class="p-8 bg-white dark:bg-slate-800 rounded shadow-md">
          <div class="flex justify-end dark:text-gray-300">
           {{ question.authName }}
          </div>
   
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-300">{{ question.title }}</h2>
          <p class="dark:text-gray-300">{{ question.description }}</p>
          
          <div class="mt-5" v-if="isMine && showEditForm === false">
           <button @click="showEditForm = true" class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            Edit
           </button>
            <button @click="deleteQuestion" class="bg-red-500 ml-3 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            delete
           </button>
          </div>
          
          <QuestionForm @closeEditForm="closeEditForm" :endpoint="editEndpoint" :data="question" v-if="showEditForm"/>
   
         </div>
        </div>
       </div>
       <div v-for="answer in question.answers"
        class="flex flex-column justify-center">
        <div class="max-w-xxl w-full p-4">
   
         <div class="p-8 bg-white dark:bg-slate-900 rounded shadow-md">
          <div class="flex justify-end dark:text-gray-300">
           {{ answer.authorName }}
          </div>
          <p class="dark:text-gray-300">{{ answer.text }}</p>
         </div>
        </div>
       </div>
   
       <div class="flex justify-end">
        <button v-if="!showAnswerForm" @click="showAnswerForm = !showAnswerForm" type="button"
         class="text-white bg-gradient-to-r from-teal-500 to-teal-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-teal-200 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
         Answer
        </button>
       </div>
       <div v-if="showAnswerForm">
        <AnswerForm :questionId="questionId" @addAnswer="addAnswer" />
       </div>
      </div>
     </div>
   
    </div>
   
   </template>
<script setup lang="ts">
import { IAnswer } from '@/types/IAnswer';
import { IQuestion } from '@/types/IQuestion';
import AskQuestionSidebar from "~/components/elements/AskQuestionSidebar.vue";
import AnswerForm from "~/components/elements/AnswerForm.vue";
import QuestionForm from "~~/components/elements/QuestionForm.vue";
// refactoring potrzebny!!!!!
const route = useRoute()
const router = useRouter()
const questionId = route.params?.id as string

if (!questionId) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found'})
}

const showEditForm = ref(false)
const showDeleted = ref(false)
const showAnswerForm = useState('showAnswerForm' + questionId, () => false)

const closeEditForm = () => showEditForm.value = false

const getQuestion = async () => {
    try {
        return await $fetch<IQuestion>(`/api/ask-question/question?id=${questionId}`)
    } catch(e) {
        const statusCode = e.response?.status
        const statusMessage = statusCode === 404 ? 'Page Not Found' : e.response?.statusText
        throw createError({ statusCode, statusMessage })
    }
}

const deleteQuestion = async () => {
  const { data: deleted }  = await useFetch('/api/ask-question/delete-question', {
   method: 'POST',
   body: { questionId }
  }) 
  showDeleted.value = true
  setTimeout(() => {
   router.push('/ask-question/search')
  })
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

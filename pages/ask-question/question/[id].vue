<template>
    <div
     class=" min-h-full theme-mode from-white to-green-200 dark:bg-black/95">
     <div class="h-32 flex justify-center">
      <div class="flex m-5">
       <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
        Ask Question
       </h1>
      </div>
     </div>
     <AskQuestionSidebar />
       <!-- <div v-if="question" class="flex flex-column justify-center">
        <div class="max-w-xxl w-full p-4">
         <div class="p-8 bg-white dark:bg-neutral-800 rounded shadow-md">
          <div class="flex justify-end dark:text-gray-300">
           @{{ question.author.username }}
          </div>
   
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-300">{{ question.title }}</h2>
          <p class="dark:text-gray-300">{{ question.description }}</p>
          
          <div class="mt-5" v-if="isMine && showEditForm === false">
           <button @click="showEditForm = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Edit
           </button>
            <button @click="deleteQuestion" class="bg-red-500 ml-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Delete
           </button>
          </div>
          
          <QuestionForm @closeEditForm="closeEditForm" :endpoint="editEndpoint" :data="question" v-if="showEditForm"/>
   
         </div>
        </div>
       </div>
       <div v-for="answer in question.answers"
        class="flex flex-column justify-center">
        <div class="max-w-xxl w-full p-4">
         <div class="p-8 bg-white dark:bg-neutral-900 rounded shadow-md">
          <div class="flex justify-end dark:text-gray-300">
           @{{ answer.author.username }}
          </div>
          <p class="dark:text-gray-300">{{ answer.text }}</p>
         </div>
        </div>
       </div> -->
            <!-- TODO Questions -->
            <div v-if="question" class="flex dark:bg-neutral-800 bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl "><!--horizantil margin is just for display-->
                <div class="flex items-start px-4 py-6">
                    <svg class="w-12 h-12 rounded-full mr-4 shrink-0" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#4ade80"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,6c1.93,0,3.5,1.57,3.5,3.5S13.93,13,12,13 s-3.5-1.57-3.5-3.5S10.07,6,12,6z M12,20c-2.03,0-4.43-0.82-6.14-2.88C7.55,15.8,9.68,15,12,15s4.45,0.8,6.14,2.12 C16.43,19.18,14.03,20,12,20z"/></g></svg>
                    <!-- <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar"> -->
                    <div>
                        <div class="flex items-center justify-between">
                            <h2 class="text-lg font-semibold text-gray-900 -mt-1 dark:text-white "> @{{ question.author.username }} </h2>
                        </div>
                        <p class="text-gray-700 dark:text-white break-all"> {{ question.title }}</p>
                        <p class="mt-3 text-gray-700 dark:text-white text-sm break-all">
                            {{ question.description }}
                        </p>
                        <div class="mt-4 flex items-center">
                            <div class="flex text-gray-700 dark:text-white  text-sm mr-8">
                            <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                            </svg>
                            <span>{{ question.answers.length }}</span>
                            </div>
                        </div>
                        <div class="mt-5" v-if="isMine && showEditForm === false">
                            <button @click="showEditForm = true" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </button>
                                <button @click="deleteQuestion" class="bg-red-500 ml-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </div>
                        <QuestionForm @closeEditForm="closeEditForm" :endpoint="editEndpoint" :data="question" v-if="showEditForm"/>
                    </div>
                </div>
            </div>
        <div v-for="answer in question.answers" class="flex dark:bg-neutral-900 bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-10 max-w-md md:max-w-2xl "><!--horizantil margin is just for display-->
        <div class="flex items-start px-4 py-6">
            <svg class="w-12 h-12 rounded-full mr-4 " xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#4ade80"><g><rect fill="none" height="24" width="24"/></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,6c1.93,0,3.5,1.57,3.5,3.5S13.93,13,12,13 s-3.5-1.57-3.5-3.5S10.07,6,12,6z M12,20c-2.03,0-4.43-0.82-6.14-2.88C7.55,15.8,9.68,15,12,15s4.45,0.8,6.14,2.12 C16.43,19.18,14.03,20,12,20z"/></g></svg>
            <!-- <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar"> -->
            <div>
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900 -mt-1 dark:text-white "> @{{ answer.author.username }} </h2>
                </div>
                <p class="mt-3 text-gray-700 dark:text-white text-sm">
                    {{ answer.text }}
                </p>
            </div>
        </div>
        </div>
       <div class="flex justify-end">
        <button v-if="!showAnswerForm" @click="showAnswerForm = !showAnswerForm" type="button"
         class="text-white bg-gradient-to-r from-green-500 to-green-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
         Answer
        </button>
       </div>
       <template v-if="showAnswerForm">
        <AnswerForm :questionId="questionId" @addAnswer="addAnswer" />
       </template>
    </div>
</template>

<script setup lang="ts">
import { IAnswer } from '@/types/IAnswer';
import { IQuestion } from '@/types/IQuestion';
import AskQuestionSidebar from "~/components/question/AskQuestionSidebar.vue"
import AnswerForm from "~/components/question/AnswerForm.vue"
import QuestionForm from "~~/components/question/QuestionForm.vue"
// refactoring potrzebny!!!!!
const route = useRoute()
const router = useRouter()
const questionId = route.params?.id as string

if (!questionId) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found'})
}

const showEditForm = ref(false)
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

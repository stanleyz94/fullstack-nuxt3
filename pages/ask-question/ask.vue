<template>
    <div
     class="min-h-full theme-mode bg-gradient-to-b from-white to-indigo-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-600">
   
     <div class="h-32 flex justify-center">
      <div class="flex m-5">
       <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="full stack jack logo" />
       <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
        Ask Question
       </h1>
      </div>
     </div>
     <div class="md:flex">
   
      <AskQuestionSidebar />
      <div class="md:w-1/3 z-1 flex justify-right relative"></div>
      <div v-if="true" class="w-full md:w-1/3 h-screen">
     
       <QuestionForm />
      </div>
     </div>
    </div>
   
   </template>
<script setup lang="ts">
import QuestionForm from '@/components/elements/QuestionForm.vue'
import AskQuestionSidebar from '@/components/elements/AskQuestionSidebar.vue'

definePageMeta({
    middleware: 'auth'
})
</script>
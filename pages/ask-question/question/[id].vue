<template>
<div>
    {{questionId}}
    <div v-if="question">
        {{ question }}
    </div>
</div>
</template>

<script setup lang="ts">
import { IAnswer } from '@/types/IAnswer';
import { IQuestion } from '@/types/IQuestion';

const route = useRoute()
const questionId = route.params?.id
if (!questionId) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found'})
}
const { data: question } = useFetch<IQuestion>(`/api/ask-question/question?id=${questionId}`, { server: false } )
const showAnswerForm = useState('showAnswerForm' + questionId , () => false)

function addAnswer(answer: IAnswer) {
    question.value?.answers.push(answer)
    showAnswerForm.value = false
}



</script>

import { CompatibilityEvent } from 'h3'
import { editQuestion, findQuestion } from '@/server/db/repositories/askQuestionRepository'
import { IQuestionPost } from '@/types/IQuestionPost'


export default defineEventHandler(async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const data: IQuestionPost = body.data 
    const questionId = data.id

    const question = await findQuestion(questionId)
    return await editQuestion(question)
})
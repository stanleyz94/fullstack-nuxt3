import { CompatibilityEvent } from 'h3'
import { editQuestion, findQuestion } from '@/server/db/repositories/askQuestionRepository'
import { IQuestionPost } from '@/types/IQuestionPost'
import { getUserBySessionToken } from '@/server/services/sessionService'


export default defineEventHandler(async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const data: IQuestionPost = body.data 
    const questionId = data.id

    const question = await findQuestion(questionId)

    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)
    const isMe = user.id === question.authorId
    
    if (!isMe) {
        sendError(event, createError({ statusCode: 403, statusMessage: 'Unauthorized'}))
    }
    
    question.description = data.description
    question.title = data.title

    return await editQuestion(question)
})
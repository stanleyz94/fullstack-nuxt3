import { CompatibilityEvent } from 'h3'
import { findQuestion } from '@/server/db/repositories/askQuestionRepository'


export default defineEventHandler(async (event: CompatibilityEvent) => {
    const queries = useQuery(event)
    const questionId = parseInt(queries.id as string)
    const question = await findQuestion(questionId)
    console.log({ question })
    if (!question) {
        sendError(event, createError({ statusCode: 404, statusMessage: 'Not Found'}))
    }
    return question
    
})
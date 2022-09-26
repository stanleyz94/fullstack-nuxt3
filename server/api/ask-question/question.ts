import { CompatibilityEvent } from 'h3'
import { findQuestion } from '@/server/db/repositories/askQuestionRepository'


export default defineEventHandler(async (event: CompatibilityEvent) => {
    const queries = useQuery(event)
    const questionId = parseInt(queries.id as string)

    return await findQuestion(questionId)
    
})
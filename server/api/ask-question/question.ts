import { CompatibilityEvent } from 'h3'
import { findQuestion } from '@/server/db/repositories/questionRepository'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const queries = useQuery(event)
  const questionId = parseInt(queries.id as string)
  const question = await findQuestion(questionId)
  if (!question) {
    sendError(
      event,
      createError({ statusCode: 404, statusMessage: 'Not Found' })
    )
  }
  return question
})

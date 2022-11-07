import { CompatibilityEvent } from 'h3'
import { findQuestion } from '@/server/db/repositories/questionRepository'
import { validateClientData } from '@/server/utils/validatorUtils'
import {
  createQuestionSchema,
  QuestionInput,
} from '@/server/schema/questionSchema'
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const query = await validateClientData<QuestionInput, typeof useQuery>(
    event,
    createQuestionSchema,
    useQuery
  )
  const questionId = query.id
  const question = await findQuestion(questionId)
  if (!question) {
    sendError(
      event,
      createError({ statusCode: 404, statusMessage: 'Not Found' })
    )
  }
  return question
})

import { CompatibilityEvent } from 'h3'
import {
  deleteQuestion,
  findQuestion,
} from '@/server/db/repositories/questionRepository'
import { getUserBySessionToken } from '~~/server/services/sessionService'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const body = await useBody(event)
  const questionId = parseInt(body.questionId)
  const question = await findQuestion(questionId)

  const authToken = getCookie(event, 'auth_token')
  const user = await getUserBySessionToken(authToken)
  const isMe = user.id === question.authorId

  if (!isMe) {
    sendError(
      event,
      createError({ statusCode: 403, statusMessage: 'Unauthorized' })
    )
  }

  return await deleteQuestion(question)
})

import { CompatibilityEvent } from 'h3'
import { createQuestion } from '@/server/db/repositories/questionRepository'
import { getUserBySessionToken } from '@/server/services/sessionService'
import { IQuestionPost } from '@/types/IQuestionPost'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const body = await useBody(event)
  const authToken = getCookie(event, 'auth_token')
  const user = await getUserBySessionToken(authToken)

  const data: IQuestionPost = body.data

  return await createQuestion(data, user.id)
})

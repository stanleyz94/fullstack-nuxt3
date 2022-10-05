import { getUserBySessionToken } from '@/server/services/sessionService'
import { IAnswerPost } from '@/types/IAnswerPost'
import { createAnswer } from '@/server/db/repositories/questionRepository'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const data: IAnswerPost = body.data
  const authToken = getCookie(event, 'auth_token')
  const user = await getUserBySessionToken(authToken)
  return await createAnswer(data, user.id)
})

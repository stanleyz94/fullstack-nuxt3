import { createQestion } from '@/server/db/repositories/askQuestionRepository'
import { getUserBySessionToken } from '@/server/services/sessionService'
export default defineEventHandler(async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const authToken = useCookie(event.req, 'auth_token')
    const user = await getUserBySessionToken(authToken)
    

 })
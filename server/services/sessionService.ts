import { CompatibilityEvent } from 'h3'
import { v4 as uuidv4 } from 'uuid'
import { extractUserInfoForClient } from './userService'
import {
  createSession,
  getSessionByAuthToken,
} from '@/server/db/repositories/sessionRepository'
import { IUser } from '@/types/IUser'

export async function makeSession(
  user: IUser,
  event: CompatibilityEvent
): Promise<IUser> {
  const authToken = uuidv4().replaceAll('-', '')
  const session = await createSession({ authToken, userId: user.id })
  const userId = session.userId

  if (userId) {
    setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true })
    return getUserBySessionToken(authToken)
  }

  throw new Error('Error Creating Session')
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
  const session = await getSessionByAuthToken(authToken)
  return extractUserInfoForClient(session.user)
}

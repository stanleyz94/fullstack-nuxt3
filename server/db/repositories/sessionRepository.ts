import { IUser } from '@/types/IUser'
import prisma from '@/server/db/client'
import { ISession } from '@/types/ISession'

export async function createSession(data: ISession): Promise<ISession> {
  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken,
    },
  })
}

export async function getSessionByAuthToken(
  authToken: string
): Promise<ISession> {
  const user: IUser = await getUserByAuthToken(authToken)

  return { authToken, user }
}

export async function getUserByAuthToken(authToken: string): Promise<IUser> {
  return await prisma.session
    .findUnique({
      where: {
        authToken,
      },
    })
    .user()
}

import prisma from '@/server/db/client'
import { IUser } from '@/types/IUser'
import { ISubscription } from '@/types/ISubscription'

export async function getUserByEmail(
  email: string,
  withPassword: boolean = false
): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      username: true,
      password: withPassword,
    },
  })
}

export async function getUserByUserName(username: string): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
    },
  })
}

export async function createUser(data: IUser) {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      name: data.name,
      email: data.email,
      loginType: data.loginType,
      password: data.password,
    },
  })

  return user
}

export async function getUserById(id: number): Promise<IUser> {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      stripeCustomerId: true,
    },
  })
}

export async function updateStripeCustomerId(data: IUser) {
  return await prisma.user.update({
    where: { email: data.email },
    data: {
      stripeCustomerId: data.stripeCustomerId,
    },
  })
}

export async function getUserByStripeCustomerId(
  stripeCustomerId: string
): Promise<IUser> {
  return await prisma.user.findFirst({
    where: {
      stripeCustomerId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      stripeCustomerId: true,
    },
  })
}

export async function createOrUpdateSubscription(data: ISubscription) {
  return await prisma.subscription.upsert({
    where: {
      stripeId: data.stripeId,
    },
    create: {
      userId: data.userId,
      stripeId: data.stripeId,
      stripeStatus: data.stripeStatus,
      stripePriceId: data.stripePriceId,
      quantity: data.quantity,
      trialEndsAt: data.trialEndsAt,
      endsAt: data.endsAt,
      lastEventDate: data.lastEventDate,
      startDate: data.startDate,
    },
    update: {
      stripeStatus: data.stripeStatus,
      stripePriceId: data.stripePriceId,
      quantity: data.quantity,
      trialEndsAt: data.trialEndsAt,
      endsAt: data.endsAt,
      lastEventDate: data.lastEventDate,
      startDate: data.startDate,
    },
  })
}

export async function getSubsriptionById(
  stripeId: string
): Promise<ISubscription> {
  return await prisma.subscription.findFirst({
    where: {
      stripeId,
    },
  })
}

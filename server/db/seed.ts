import { mockAnswers, mockQuestions, mockUsers } from '../utils/mockDataUtils'
import prisma from './client'

async function mockData(isDev: boolean = true) {
  if (isDev) {
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ')
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
  }
  const amount = 10
  await mockUsers(amount)
  await mockQuestions(amount)
  await mockAnswers(amount)
}

mockData()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

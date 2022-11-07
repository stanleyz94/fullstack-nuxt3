import { mockAnswers, mockQuestions, mockUsers } from '../utils/mockDataUtils'
import prisma from './client'

async function mockData(isDev: boolean = true) {
  if (isDev) {
    const deletedSessions = prisma.session.deleteMany()
    const deletedUsers = prisma.user.deleteMany()
    const deletedQuestions = prisma.question.deleteMany()
    const deletedAnswers = prisma.answer.deleteMany()
    await prisma.$transaction([
      deletedAnswers,
      deletedQuestions,
      deletedUsers,
      deletedSessions,
    ])
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

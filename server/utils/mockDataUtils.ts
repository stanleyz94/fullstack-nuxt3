import * as bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { IUser } from '../../types/IUser'
import { IQuestionPost } from '../../types/IQuestionPost'
import prisma from '../db/client'
import { IQuestion } from '../../types/IQuestion'
import { IAnswerPost } from '../../types/IAnswerPost'

type AuthorId = { authorId: number }
type IQuestionPostAuthorId = IQuestionPost & AuthorId
type IAnswerPostAuthorId = IAnswerPost & AuthorId

type IQuestionSimplified = Omit<IQuestion, 'answers' | 'author'>

async function createRandomUser(): Promise<IUser> {
  const randomUser = {
    username: faker.internet.userName(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    loginType: 'email',
    password: faker.internet.password(),
  }
  randomUser.password = await bcrypt.hash(randomUser.password, 10)
  return randomUser
}

function createRandomQuestion(users: IUser[]): IQuestionPostAuthorId {
  const randomUser = users[Math.floor(Math.random() * users.length)]
  return {
    title: faker.random.words(3),
    description: faker.random.words(15),
    authorId: randomUser.id,
  }
}

function createRandomAnswer(
  questions: IQuestionSimplified[]
): IAnswerPostAuthorId {
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  return {
    text: faker.random.words(15),
    questionId: randomQuestion.id,
    authorId: randomQuestion.authorId,
  }
}

async function createManyUsers(data: IUser[]) {
  return await prisma.user.createMany({
    data,
  })
}

async function createManyQuestions(data: IQuestionPostAuthorId[]) {
  return await prisma.question.createMany({
    data,
  })
}

async function createManyAnswers(data: IAnswerPostAuthorId[]) {
  return await prisma.answer.createMany({
    data,
  })
}

async function findQuestions(): Promise<IQuestionSimplified[]> {
  return await prisma.question.findMany()
}

async function findUsers(): Promise<IUser[]> {
  return await prisma.user.findMany()
}

export async function mockUsers(amount: number = 10) {
  const usersData = []
  for (let i = 0; i < amount; i++) {
    const user = await createRandomUser()
    usersData.push(user)
  }
  return await createManyUsers(usersData)
}

export async function mockQuestions(amount: number = 10) {
  const users = await findUsers()
  const questionData = []
  for (let i = 0; i < amount; i++) {
    const user = createRandomQuestion(users)
    questionData.push(user)
  }
  return await createManyQuestions(questionData)
}

export async function mockAnswers(amount: number) {
  const questions = await findQuestions()
  const answersData = []
  for (let i = 0; i < amount; i++) {
    const answer = createRandomAnswer(questions)
    answersData.push(answer)
  }
  return await createManyAnswers(answersData)
}

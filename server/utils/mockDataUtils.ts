import * as bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { createManyUsers } from '@/server/db/repositories/userRepository'
import { IUser } from '@/types/IUser'

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

export async function mockUsers(amount: number = 10) {
  const usersData = []
  for (let i = 0; i < amount; i++) {
    const user = await createRandomUser()
    usersData.push(user)
  }
  return await createManyUsers(usersData)
}

export async function mockQuestions(amount: number = 10) {
  const usersData = []
  for (let i = 0; i < amount; i++) {
    const user = await createRandomUser()
    usersData.push(user)
  }
  return await createManyUsers(usersData)
}

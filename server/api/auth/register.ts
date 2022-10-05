import { CompatibilityEvent } from 'h3'
import * as bcrypt from 'bcrypt'
import { IUser } from '@/types/IUser'
import { doesUserExists } from '@/server/services/userService'
import { createUser } from '@/server/db/repositories/userRepository'
import { makeSession } from '@/server/services/sessionService'
import { validateBody } from '@/server/utils'
import { CreateUserInput, createUserSchema } from '@/server/schema/userSchema'

export default async (event: CompatibilityEvent) => {
  const body = await validateBody<CreateUserInput>(event, createUserSchema)
  const data = body.data

  await doesUserExists(data)

  const encryptedPassword: string = await bcrypt.hash(data.password, 10)

  const userData: IUser = {
    username: data.username,
    name: data.name,
    email: data.email,
    loginType: 'email',
    password: encryptedPassword,
  }

  const user = await createUser(userData)

  return await makeSession(user, event)
}

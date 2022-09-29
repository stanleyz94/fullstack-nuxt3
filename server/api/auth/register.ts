import { CompatibilityEvent, sendError } from 'h3'
import { IUser } from '@/types/IUser'
import bcrypt from 'bcrypt'
import { validateUser } from '@/server/services/userService'
import { createUser } from '@/server/db/repositories/userRepository'
import { makeSession } from '@/server/services/sessionService'
import { RegistrationRequest } from '@/types/IRegistration'
import { validateBody } from '@/server/utils'
import { CreateUserInput, createUserSchema } from '@/server/schema/userSchema'


export default async (event: CompatibilityEvent) => {
    const body = await validateBody<CreateUserInput>(event, createUserSchema)
    const data = body.data
    // const validation = await validateUser(data)
  
    // if (validation.hasErrors === true) {
    //   const errors = JSON.stringify(Object.fromEntries(validation.errors))
    //   return sendError(event, createError({ statusCode: 422, data: errors }))
    // }
  
    const encryptedPassword: string = await bcrypt.hash(data.password, 10)
  
    const userData: IUser = {
      username: data.username,
      name: data.name,
      email: data.email,
      loginType: 'email',
      password: encryptedPassword
    }
  
    const user = await createUser(userData)
  
    return await makeSession(user, event)
  }
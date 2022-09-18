import { CompatibilityEvent, sendError } from 'h3'
import { IUser } from '@/types/IUser'
import bcrypt from 'bcrypt'
import { doesUserExists } from '@/server/services/userService'
import { createUser } from '@/server/db/repositories/userRepository'
import { makeSession } from '@/server/services/sessionService'

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const { name, username, email, password } = body
    const userExists = await doesUserExists(email, username)
    if (userExists.value) {
        sendError(event, createError({ statusCode: 422, statusMessage: userExists.message }))
    }

    const encryptedPassword : string = await bcrypt.hash(password, 10) 
    const userData: IUser = {
        username,
        name,
        loginType: 'email',
        password: encryptedPassword
    }
    const user = await createUser(userData)

    return await makeSession(user, event)
}
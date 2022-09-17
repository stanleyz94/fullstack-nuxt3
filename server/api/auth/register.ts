import { CompatibilityEvent, sendError } from 'h3'
import { IUser } from '~~/types/IUser'
import bcrypt from 'bcrypt'

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const { name, username, email, password } = body
    const userExists = await doesUserExists(email, username)

    if (userExists.value === true) {
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
    return 'hello from the api'
}
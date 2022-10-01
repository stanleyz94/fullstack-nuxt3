import { IUser } from "@/types/IUser"
import { getUserByEmail, getUserByUserName } from "../db/repositories/userRepository"
import { CreateUserInput } from "../schema/userSchema"


export async function doesUserExists({ username, email }: CreateUserInput['data']) {
    
    const userExistWithThatEmail = await getUserByEmail(email)
    
    if (userExistWithThatEmail) {
        throw createError({ statusCode: 422, statusMessage: `This email, ${email}, is already registered!`, data: {
            path: [
                'data',
                'email'
            ],
            message: `This email, ${email}, is already registered!`
        } })
    }

    const userExistsWithThatUsername = await getUserByUserName(username)
    
    if (userExistsWithThatUsername) {
        throw createError({ statusCode: 422, statusMessage: `The username, ${username}, is already registered!`, data: {
            path: [
                'data',
                'username'
            ],
            message: `The username, ${username}, is already registered!`
        } })

    }
}


export function extractUserInfoForClient(user: IUser | undefined): IUser {
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: `Unauthorized` })
    }

    delete user.password
    delete user.loginType
    delete user.stripeCustomerId

    return user
}
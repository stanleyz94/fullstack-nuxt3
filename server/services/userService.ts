import { IUser } from "@/types/IUser"
import { FormValidation } from "@/types/FormValidation"
import { RegistrationRequest } from "@/types/IRegistration"
import { getUserByEmail, getUserByUserName } from "../db/repositories/userRepository"
// import { validate } from "./validator"
import { CreateUserInput } from "../schema/userSchema"

type ExistsCheck = {
    value: boolean
    message?: string
}

type RegistrationErrors = {
    emailError?: string
    usernameError?: string
}


// export async function validateUser(data: RegistrationRequest): Promise<FormValidation> {
//     const errors = await validate(data)

//     if (errors.size > 0) {
//         return { hasErrors: true, errors }
//     }

//     return { hasErrors: false }
// }


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


export function sanitizeUserForFrontend(user: IUser | undefined): IUser {
    if (!user) {
        return user
    }

    delete user.password
    delete user.loginType
    delete user.stripeCustomerId

    return user
}
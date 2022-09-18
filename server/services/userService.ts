import { getUserByEmail, getUserByUserName } from "../db/repositories/userRepository"

type ExistsCheck = {
    value: boolean
    message?: string
}

type RegistrationErrors = {
    emailError?: string
    usernameError?: string
}


export async function doesUserExists(email: string, username: string): Promise<ExistsCheck>{ 
    const hasEmail = await getUserByEmail(email)
    const hasUserName = await getUserByUserName(email)
    const emailExists = hasEmail !== null
    const userNameExists = hasUserName !== null
    console.log('doesUserExists', {
        hasEmail, hasUserName
    })
    const errors : RegistrationErrors = {}

    if (emailExists) {
        errors.emailError = `This email, ${email}, is already registered`
    }

    if (emailExists || userNameExists) {
        const message = JSON.stringify(errors)
        return { value: true, message }
    }
    return { value: false }
}
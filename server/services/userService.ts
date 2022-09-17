type ExistsCheck = {
    value: boolean
    message?: string
}

type RegistrationErrors = {
    emailError?: string
    usernameError?: string
}


export async function doesUserExists(email: string, username: string): Promise<ExistsCheck>{ 

}
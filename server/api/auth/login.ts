import { sanitizeUserForFrontend } from "@/server/services/userService";
import bcrypt from 'bcrypt'
import { getUserByEmail } from "@/server/db/repositories/userRepository";
import { CompatibilityEvent, sendError } from 'h3'
import { makeSession } from "@/server/services/sessionService";

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event)
    const email: string = body.email
    const password: string = body.password
    const user = await getUserByEmail(email)
    console.log({ user, password, body })
    if (!user) {
        sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized'}))
    }
    const isPasswordCorrect = bcrypt.compare(password, user.password)


    if (!isPasswordCorrect) {
        sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized'}))
    }

    await makeSession(user, event)

    return sanitizeUserForFrontend(user)
}


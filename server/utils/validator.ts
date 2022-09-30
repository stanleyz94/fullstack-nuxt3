import { AnyZodObject } from 'zod'
import { CompatibilityEvent } from 'h3'

export async function validateBody<T>(event: CompatibilityEvent, schema: AnyZodObject): Promise<T> {
    const body = await useBody(event)
    try {
        schema.parse(body)
        return body
    } catch(e: any) {
        throw createError({ statusCode: 400, statusMessage: `Invalid request`, data: e.errors })
    }
}
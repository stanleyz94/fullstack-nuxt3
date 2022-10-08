import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { AnyZodObject } from 'zod'
import { CompatibilityEvent } from 'h3'

const encryptionKey = randomBytes(32)
const initVector = randomBytes(16)
const algorithm = 'aes-256-cbc'

export async function validateBody<T>(
  event: CompatibilityEvent,
  schema: AnyZodObject
): Promise<T> {
  const body = await useBody(event)
  try {
    schema.parse(body)
    return body
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid request`,
      data: e.errors,
    })
  }
}

export const useCryptCursor = () => ({
  encryptCursor(val: string) {
    const cipher = createCipheriv(algorithm, encryptionKey, initVector)
    let encrypted = cipher.update(JSON.stringify(val), 'utf8', 'base64')
    encrypted += cipher.final('base64')

    return encrypted
  },
  decryptCursor(encrypted: string) {
    try {
      const decipher = createDecipheriv(algorithm, encryptionKey, initVector)
      let decrypted = decipher.update(encrypted, 'base64', 'utf8')
      decrypted = decrypted + decipher.final('utf8')
      return decrypted
    } catch (e) {
      console.log('error internal', { e })
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid request`,
      })
    }
  },
})

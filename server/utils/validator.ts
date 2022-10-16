import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  CipherGCMTypes,
} from 'crypto'
import { AnyZodObject } from 'zod'
import { CompatibilityEvent } from 'h3'

const config = useRuntimeConfig()
const encryptionKey = config.private.encryptionKey
const algorithm: CipherGCMTypes = 'aes-256-gcm'

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

export const useCryptCursor = () => {
  const generateIv = () => randomBytes(32)

  const encryptCursor = (data: string) => {
    const iv = generateIv()

    const cipher = createCipheriv(algorithm, encryptionKey, iv)

    const encryptedData = Buffer.concat([
      cipher.update(Buffer.from(data, 'utf-8')),
      cipher.final(),
    ])

    const authTag = cipher.getAuthTag()

    return `${iv.toString('hex')}:${authTag.toString(
      'hex'
    )}:${encryptedData.toString('hex')}`
  }
  const decryptCursor = (data: string) => {
    const encryptedData = data.split(':')
    const iv = Buffer.from(encryptedData.shift(), 'hex')
    const authTag = Buffer.from(encryptedData.shift(), 'hex')

    const encryptedSecret = Buffer.from(encryptedData.join(':'), 'hex')

    const decipher = createDecipheriv(algorithm, Buffer.from(encryptionKey), iv)
    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([
      decipher.update(encryptedSecret),
      decipher.final(),
    ])

    return decrypted.toString('utf-8')
  }

  return { encryptCursor, decryptCursor }
}

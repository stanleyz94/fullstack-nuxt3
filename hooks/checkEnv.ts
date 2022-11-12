import { SafeParseError, z, ZodFormattedError } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  ENCRYPTION_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  APP_DOMAIN: z.string().url(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  DATABASE_URL: z.string().url(),
})

const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>
) => {
  const formattedErrors = Object.entries(errors)
    .map(([name, value]) => {
      if (typeof value === 'object' && value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}\n`
      }
      return false
    })
    .filter(Boolean)
  return formattedErrors
}

export const checkEnv = () => {
  const _env = envSchema.safeParse(process.env)
  if (!_env.success) {
    const { error } = _env as SafeParseError<typeof _env>
    const envErrors = error.format()
    const formattedErrors = formatErrors(envErrors)
    // eslint-disable-next-line no-console
    console.error(
      '❌ Missing/invalid environment variables:\n',
      ...formattedErrors
    )
    process.exit(1)
  }
}

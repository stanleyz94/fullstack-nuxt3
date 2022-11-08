import { NEVER, ZodIssueCode, type RefinementCtx } from 'zod'

export const transformToInt = (val: string, ctx: RefinementCtx) => {
  const parsed = parseInt(val)
  if (isNaN(parsed)) {
    ctx.addIssue({
      message: 'Not a number',
      code: ZodIssueCode.custom,
    })
    return NEVER
  }
  return parsed
}

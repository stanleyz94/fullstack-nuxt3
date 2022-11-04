import { object, string, TypeOf } from 'zod'
import { transformToInt } from '@/server/utils'

export const createQuestionSchema = object({
  id: string({
    required_error: 'id is required',
  })
    .min(1)
    .transform(transformToInt),
})
type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
export type QuestionInput = DeepRequired<TypeOf<typeof createQuestionSchema>>

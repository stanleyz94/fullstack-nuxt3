import { object, string, TypeOf } from 'zod'
import { transformToInt } from '@/server/utils'

export const createSearchSchema = object({
  search: string({
    required_error: 'Search is required',
  }),
  take: string({
    required_error: 'Take is required',
  })
    .min(1)
    .transform(transformToInt),
  cursor: string({
    required_error: 'Cursor is required',
  }),
})
type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
export type QuestionSearchInput = DeepRequired<
  TypeOf<typeof createSearchSchema>
>

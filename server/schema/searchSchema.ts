import { object, string, TypeOf, number } from 'zod'

export const createSearchSchema = object({
  query: object({
    search: string({
      required_error: 'Search is required',
      invalid_type_error: 'Search must be a string',
    }),
    take: number({
      required_error: 'Take is required',
      invalid_type_error: 'Take must be a number',
    }),
    cursor: number({
      required_error: 'Cursor is required',
      invalid_type_error: 'Cursor must be a number or null',
    }).nullable(),
    test: number().nullable(),
  }),
})

type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
export type QuestionSearchInput = DeepRequired<
  TypeOf<typeof createSearchSchema>
>
// type Test = TypeOf<typeof createSearchSchema>

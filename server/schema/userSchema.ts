import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  data: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short - should be min 6 characters'),
    username: string({
      required_error: 'Username is required',
    }),
    name: string({
      required_error: 'Name is required',
    }),
  }),
})

type DeepRequired<T> = Required<{ [P in keyof T]: DeepRequired<T[P]> }>
export type CreateUserInput = DeepRequired<TypeOf<typeof createUserSchema>>

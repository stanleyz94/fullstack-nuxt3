import { IQuestion } from './IQuestion'

export interface ISearch {
  result: IQuestion[]
  meta: {
    nextCursor: string | null
  }
}

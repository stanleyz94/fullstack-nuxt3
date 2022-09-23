import { IAnswer } from "./IAnswer"

export interface IQuestion {
    id: number
    authorId: number
    authName?: string
    title: string
    description: string
    answers: IAnswer[]
}
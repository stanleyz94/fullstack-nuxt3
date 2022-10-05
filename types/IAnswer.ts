export interface IAnswer {
  text: string
  authorId: number
  author?: {
    username: string
  }
}

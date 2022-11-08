import prisma from '@/server/db/client'
import { IQuestionPost } from '@/types/IQuestionPost'
import { IQuestion } from '@/types/IQuestion'
import { IAnswerPost } from '@/types/IAnswerPost'

export async function createQuestion(data: IQuestionPost, authorId: number) {
  return await prisma.question.create({
    data: {
      authorId,
      title: data.title,
      description: data.description,
    },
  })
}

export async function findQuestion(id: number): Promise<IQuestion> {
  return await prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      answers: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
      author: {
        select: {
          username: true,
        },
      },
    },
  })
}

export async function createAnswer(data: IAnswerPost, authorId: number) {
  return await prisma.answer.create({
    data: {
      authorId,
      questionId: data.questionId,
      text: data.text,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  })
}

// export async function searchQuestions(query: string): Promise<IQuestion[]> {
//     const result = await prisma.$queryRaw(Prisma.sql`SELECT Question.title, Question.description, User.name, User.username FROM Question INNER JOIN User ON Question.authorId=User.id WHERE title LIKE ${query} OR description LIKE ${query}`)
//     return result as IQuestion[]
// }
// type IQuestionWithAuthorUsername = (IQuestion & { author: { username: string }})[]

export async function searchQuestions({
  search,
  take,
  cursor: lastId,
}: {
  search: string
  take: number
  cursor: number | null
}): Promise<IQuestion[]> {
  return await prisma.question.findMany({
    take,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
    where: {
      OR: [
        {
          title: { contains: search, mode: 'insensitive' },
        },
        {
          description: { contains: search, mode: 'insensitive' },
        },
      ],
    },
    include: {
      answers: true,
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
  })
}

export async function editQuestion({ id, title, description }: IQuestionPost) {
  return await prisma.question.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  })
}

export async function deleteQuestion({ id }: IQuestionPost) {
  return await prisma.question.delete({
    where: {
      id,
    },
  })
}

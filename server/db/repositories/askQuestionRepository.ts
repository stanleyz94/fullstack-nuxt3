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
        }
    })
    
}

export async function findQuestion(id: number): Promise<IQuestion> {
    return await prisma.question.findUnique({
        where: {
            id
        },
        include: {
            answers: true
        }
    })
}

export async function createAnswer(data: IAnswerPost, authorId: number) {
    return await prisma.answer.create({
        data: {
            authorId,
            questionId: data.questionId,
            text: data.text 
        },
    })
    
}
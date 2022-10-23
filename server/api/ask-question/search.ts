import { CompatibilityEvent } from 'h3'
import { searchQuestions } from '@/server/db/repositories/questionRepository'
import { useCryptCursor } from '@/server/utils'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const query = useQuery(event)
  const { encryptCursor, decryptCursor } = useCryptCursor()
  let decodedCursor = null
  const search = query.search as string
  const take = parseInt(query.take as string)
  const cursor = query.cursor
  // let limit = parseInt(query.limit)
  // let cursor = query.cursor

  // if (!limit) limit = 6

  // if(!cursor) {
  //   cursor = new Date().toISOString()
  // } else {
  //   cursor = new Date(cursor).toISOString()
  // }

  // sort

  // query.search as string
  if (cursor) {
    decodedCursor = parseInt(decryptCursor(cursor as string))
  }
  const result = await searchQuestions({
    search,
    take: 4,
    cursor: decodedCursor,
  })

  const hasMoreResults = result.length === take + 1

  let nextCursor = null

  if (hasMoreResults) {
    nextCursor = result[4 - 1].id
    nextCursor = encryptCursor(nextCursor.toString())
  }
  // const hasMoreResults = result.length === limit + 1
  // let nextCursor = null

  // if (hasMoreResults) {
  //   //remembering next cursor value
  //   const nextCursorResult = result[limit - 1]
  //   nextCursor = new Date(nextCursorResult.createdAt).getTime()
  //   result.pop()
  // }

  // const response = {
  //   limit,
  //   hasMoreResults,
  //   cursor: nextCursor,
  //   resultCount: result.length,
  //   result

  // }

  // const test = {
  //   take: 4,
  //   skip: lastId ? 1 : 0,
  //   ...(lastId && { cursor: lastId }),
  // }
  console.log({ data: result, meta: { nextCursor } })
  return {
    result,
    meta: {
      nextCursor,
    },
  }
})

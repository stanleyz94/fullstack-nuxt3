import { CompatibilityEvent } from 'h3'
import { searchQuestions } from '@/server/db/repositories/questionRepository'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const query = useQuery(event)

  // let limit = parseInt(query.limit)
  // let cursor = query.cursor

  // if (!limit) limit = 6

  // if(!cursor) {
  //   cursor = new Date().toISOString()
  // } else {
  //   cursor = new Date(cursor).toISOString()
  // }

  // sort
  const result = await searchQuestions(query.search as string)
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
  console.log({ result })
  return result
})

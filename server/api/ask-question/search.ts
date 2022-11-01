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

  if (cursor) {
    decodedCursor = parseInt(decryptCursor(cursor as string))
  }

  const result = await searchQuestions({
    search,
    take: 4,
    cursor: decodedCursor,
  })
  const hasMoreResults = result.length === take

  let nextCursor = null

  if (hasMoreResults) {
    nextCursor = result[4 - 1].id
    nextCursor = encryptCursor(nextCursor.toString())
  }

  return {
    result,
    meta: {
      nextCursor,
      searchedWord: search,
    },
  }
})

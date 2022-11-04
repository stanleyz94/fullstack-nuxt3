import { CompatibilityEvent } from 'h3'
import { searchQuestions } from '@/server/db/repositories/questionRepository'
import { useCryptCursor, validateClientData } from '@/server/utils'
import {
  createSearchSchema,
  QuestionSearchInput,
} from '@/server/schema/searchSchema'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const query = await validateClientData<QuestionSearchInput, typeof useQuery>(
    event,
    createSearchSchema,
    useQuery
  )
  const { encryptCursor, decryptCursor } = useCryptCursor()
  let decodedCursor = null
  const search = query.search
  const take = query.take
  const cursor = query.cursor
  if (cursor) {
    decodedCursor = parseInt(decryptCursor(cursor))
  }

  const result = await searchQuestions({
    search,
    take,
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

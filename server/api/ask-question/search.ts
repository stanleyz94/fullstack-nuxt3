import { CompatibilityEvent } from 'h3'
import { searchQuestions } from '@/server/db/repositories/questionRepository'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const queries = useQuery(event)
  return await searchQuestions(queries.search as string)
})

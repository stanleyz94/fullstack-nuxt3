import prisma from '@/server/db/client'
import { mockUsers } from '~/server/utils'

async function main() {
  // await mockUsers()
  console.log('test')
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

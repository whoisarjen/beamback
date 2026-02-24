import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

let prisma: PrismaClient

function getPrismaClient(): PrismaClient {
  if (!prisma) {
    const connectionString = process.env.NUXT_DATABASE_URL
    if (!connectionString) {
      throw new Error('NUXT_DATABASE_URL environment variable is not set')
    }
    const adapter = new PrismaNeon({ connectionString })
    prisma = new PrismaClient({ adapter })
  }
  return prisma
}

export { getPrismaClient }
export type { PrismaClient }

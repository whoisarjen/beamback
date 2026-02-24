import { defineEventHandler, readBody } from 'h3'
import { getPrismaClient } from '../../utils/db'
import { validateBody } from '../../utils/validation'
import { waitlistSchema } from '../../../app/utils/validators'

export default defineEventHandler(async (event) => {
  const db = getPrismaClient()
  const body = await readBody(event)
  const data = validateBody(body, waitlistSchema)

  await db.waitlist.upsert({
    where: { email: data.email },
    update: {
      source: data.source || undefined,
    },
    create: {
      email: data.email,
      source: data.source || null,
    },
  })

  return { success: true, message: 'You have been added to the waitlist!' }
})

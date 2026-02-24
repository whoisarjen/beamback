import { defineEventHandler } from 'h3'
import { clearUserSession } from '#imports'
import { requireAuthUser } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const db = getPrismaClient()

  // Delete user — projects cascade via onDelete: Cascade in schema,
  // which also cascades feedback and votes
  await db.user.delete({ where: { id: user.id } })

  await clearUserSession(event)

  return { success: true }
})

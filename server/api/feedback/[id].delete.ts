import { defineEventHandler, getRouterParam } from 'h3'
import { requireAuthUser } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { notFound } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const feedbackId = getRouterParam(event, 'id')!
  const db = getPrismaClient()

  // Verify feedback exists and user owns the parent project
  const feedback = await db.feedback.findUnique({
    where: { id: feedbackId },
    include: { project: { select: { ownerId: true } } },
  })

  if (!feedback || feedback.project.ownerId !== user.id) throw notFound()

  await db.feedback.delete({ where: { id: feedbackId } })

  return { success: true }
})

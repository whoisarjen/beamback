import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { requireAuthUser } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { validateBody } from '../../utils/validation'
import { notFound } from '../../utils/errors'
import { updateFeedbackSchema } from '../../../app/utils/validators'

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

  const body = await readBody(event)
  const data = validateBody(body, updateFeedbackSchema)

  const updated = await db.feedback.update({
    where: { id: feedbackId },
    data,
  })

  return updated
})

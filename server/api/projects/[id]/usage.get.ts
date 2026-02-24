import { defineEventHandler, getRouterParam } from 'h3'
import { requireProjectOwner } from '../../../utils/auth'
import { getPrismaClient } from '../../../utils/db'
import { startOfMonth } from 'date-fns'
import { TIER_LIMITS } from '../../../../app/utils/constants'

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')!
  const { user, project } = await requireProjectOwner(event, projectId)
  const db = getPrismaClient()

  const monthStart = startOfMonth(new Date())

  const currentMonthCount = await db.feedback.count({
    where: {
      projectId: project.id,
      createdAt: { gte: monthStart },
    },
  })

  const tierLimit = TIER_LIMITS[user.tier].maxFeedbackPerMonth

  return {
    currentMonthFeedback: currentMonthCount,
    monthlyLimit: tierLimit,
    tier: user.tier,
  }
})

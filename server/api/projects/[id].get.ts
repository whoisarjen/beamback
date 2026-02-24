import { defineEventHandler, getRouterParam } from 'h3'
import { requireProjectOwner } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { startOfMonth } from 'date-fns'

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')!
  const { project } = await requireProjectOwner(event, projectId)
  const db = getPrismaClient()

  const now = new Date()
  const monthStart = startOfMonth(now)

  const [totalCount, monthCount, statusBreakdown] = await Promise.all([
    db.feedback.count({ where: { projectId: project.id } }),
    db.feedback.count({
      where: {
        projectId: project.id,
        createdAt: { gte: monthStart },
      },
    }),
    db.feedback.groupBy({
      by: ['status'],
      where: { projectId: project.id },
      _count: { id: true },
    }),
  ])

  const statusMap = Object.fromEntries(
    statusBreakdown.map((s) => [s.status, s._count.id]),
  )

  return {
    ...project,
    stats: {
      totalFeedback: totalCount,
      thisMonthFeedback: monthCount,
      byStatus: {
        NEW: statusMap.NEW || 0,
        PLANNED: statusMap.PLANNED || 0,
        IN_PROGRESS: statusMap.IN_PROGRESS || 0,
        DONE: statusMap.DONE || 0,
        CLOSED: statusMap.CLOSED || 0,
      },
    },
  }
})

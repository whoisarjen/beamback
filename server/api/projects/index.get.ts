import { defineEventHandler } from 'h3'
import { requireAuthUser } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const db = getPrismaClient()

  const projects = await db.project.findMany({
    where: { ownerId: user.id },
    include: {
      _count: {
        select: {
          feedback: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Fetch unread counts separately for each project
  const projectIds = projects.map((p) => p.id)
  const unreadCounts = await db.feedback.groupBy({
    by: ['projectId'],
    where: {
      projectId: { in: projectIds },
      isRead: false,
    },
    _count: { id: true },
  })

  const unreadMap = new Map(
    unreadCounts.map((uc) => [uc.projectId, uc._count.id]),
  )

  return projects.map((project) => ({
    ...project,
    feedbackCount: project._count.feedback,
    unreadCount: unreadMap.get(project.id) || 0,
    _count: undefined,
  }))
})

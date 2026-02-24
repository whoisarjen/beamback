import { defineEventHandler, getQuery } from 'h3'
import { z } from 'zod'
import { requireAuthUser } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { validateQuery } from '../../utils/validation'
import { notFound } from '../../utils/errors'
import { paginationSchema } from '../../../app/utils/validators'

const feedbackQuerySchema = paginationSchema.extend({
  projectId: z.string().min(1),
  status: z.enum(['NEW', 'PLANNED', 'IN_PROGRESS', 'DONE', 'CLOSED']).optional(),
  search: z.string().max(200).optional(),
})

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const db = getPrismaClient()
  const query = getQuery(event)
  const { projectId, status, search, page, limit } = validateQuery(query, feedbackQuerySchema)

  // Verify user owns the project
  const project = await db.project.findUnique({ where: { id: projectId } })
  if (!project || project.ownerId !== user.id) throw notFound()

  const where: Record<string, unknown> = { projectId }

  if (status) {
    where.status = status
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    db.feedback.findMany({
      where,
      include: {
        _count: {
          select: { votes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    db.feedback.count({ where }),
  ])

  return {
    data: data.map((item) => ({
      ...item,
      voteCount: item._count.votes,
      _count: undefined,
    })),
    total,
    page,
    limit,
  }
})

import { defineEventHandler, getRouterParam, getQuery } from 'h3'
import { z } from 'zod'
import { getPrismaClient } from '../../../utils/db'
import { validateQuery } from '../../../utils/validation'
import { notFound } from '../../../utils/errors'
import { paginationSchema } from '../../../../app/utils/validators'

const boardFeedbackQuerySchema = paginationSchema.extend({
  status: z.enum(['NEW', 'PLANNED', 'IN_PROGRESS', 'DONE', 'CLOSED']).optional(),
  search: z.string().max(200).optional(),
})

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const db = getPrismaClient()
  const query = getQuery(event)
  const { status, search, page, limit } = validateQuery(query, boardFeedbackQuerySchema)

  const project = await db.project.findUnique({ where: { slug } })
  if (!project || !project.isPublic) throw notFound()

  const where: Record<string, unknown> = { projectId: project.id }

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
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        authorName: true,
        createdAt: true,
        updatedAt: true,
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
      id: item.id,
      title: item.title,
      description: item.description,
      status: item.status,
      authorName: item.authorName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      voteCount: item._count.votes,
    })),
    total,
    page,
    limit,
  }
})

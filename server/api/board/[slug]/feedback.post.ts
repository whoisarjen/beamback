import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { startOfMonth } from 'date-fns'
import { getPrismaClient } from '../../../utils/db'
import { validateBody } from '../../../utils/validation'
import { notFound, badRequest } from '../../../utils/errors'
import { checkFeedbackMonthlyLimit } from '../../../utils/tierLimits'
import { getClientIp, hashIp } from '../../../utils/ip'
import { enforceSubmitRateLimit } from '../../../utils/rateLimit'
import { submitFeedbackSchema } from '../../../../app/utils/validators'

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '')
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const db = getPrismaClient()

  // Rate limit before any DB work
  await enforceSubmitRateLimit(event)

  const project = await db.project.findUnique({
    where: { slug },
    include: { owner: { select: { tier: true } } },
  })
  if (!project || !project.isPublic) throw notFound()

  const body = await readBody(event)

  // Honeypot check: if "website" field is present, silently succeed
  if (body?.website) {
    return { success: true }
  }

  const data = validateBody(body, submitFeedbackSchema)

  // Check monthly feedback limit
  const monthStart = startOfMonth(new Date())
  const monthCount = await db.feedback.count({
    where: {
      projectId: project.id,
      createdAt: { gte: monthStart },
    },
  })
  const limitCheck = checkFeedbackMonthlyLimit(project.owner.tier, monthCount)
  if (!limitCheck.allowed) {
    throw badRequest(limitCheck.reason)
  }

  // Get and hash IP
  const config = useRuntimeConfig()
  const ip = getClientIp(event)
  const ipHashed = hashIp(ip, config.ipHashSalt)

  // Strip HTML from title and description
  const sanitizedTitle = stripHtml(data.title)
  const sanitizedDescription = data.description ? stripHtml(data.description) : null

  await db.feedback.create({
    data: {
      title: sanitizedTitle,
      description: sanitizedDescription,
      authorEmail: data.authorEmail || null,
      authorName: data.authorName || null,
      ipHash: ipHashed,
      projectId: project.id,
    },
  })

  return { success: true }
})

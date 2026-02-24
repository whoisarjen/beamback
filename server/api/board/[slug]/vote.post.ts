import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { z } from 'zod'
import { getPrismaClient } from '../../../utils/db'
import { validateBody } from '../../../utils/validation'
import { notFound } from '../../../utils/errors'
import { getClientIp, hashIp } from '../../../utils/ip'
import { enforceVoteRateLimit } from '../../../utils/rateLimit'

const publicVoteSchema = z.object({
  feedbackId: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const db = getPrismaClient()

  // Rate limit before any DB work
  await enforceVoteRateLimit(event)

  const project = await db.project.findUnique({ where: { slug } })
  if (!project || !project.isPublic) throw notFound()

  const body = await readBody(event)
  const { feedbackId } = validateBody(body, publicVoteSchema)

  // Verify feedback belongs to this project
  const feedback = await db.feedback.findUnique({ where: { id: feedbackId } })
  if (!feedback || feedback.projectId !== project.id) throw notFound()

  // Get and hash IP for deduplication
  const config = useRuntimeConfig()
  const ip = getClientIp(event)
  const ipHashed = hashIp(ip, config.ipHashSalt)

  // Check if vote already exists by ipHash
  const existingVote = await db.vote.findUnique({
    where: {
      feedbackId_ipHash: {
        feedbackId,
        ipHash: ipHashed,
      },
    },
  })

  if (existingVote) {
    // Unvote
    await db.vote.delete({ where: { id: existingVote.id } })
  } else {
    // Vote
    await db.vote.create({
      data: {
        feedbackId,
        ipHash: ipHashed,
      },
    })
  }

  const count = await db.vote.count({ where: { feedbackId } })

  return {
    voted: !existingVote,
    count,
  }
})

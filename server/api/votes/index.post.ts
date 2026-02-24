import { defineEventHandler, readBody } from 'h3'
import { z } from 'zod'
import { requireAuthUser } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { validateBody } from '../../utils/validation'

const voteBodySchema = z.object({
  feedbackId: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const db = getPrismaClient()
  const body = await readBody(event)
  const { feedbackId } = validateBody(body, voteBodySchema)

  // Check if vote already exists
  const existingVote = await db.vote.findUnique({
    where: {
      feedbackId_userId: {
        feedbackId,
        userId: user.id,
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
        userId: user.id,
      },
    })
  }

  const count = await db.vote.count({ where: { feedbackId } })

  return {
    voted: !existingVote,
    count,
  }
})

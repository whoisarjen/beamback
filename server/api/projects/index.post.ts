import { defineEventHandler, readBody } from 'h3'
import { requireAuthUser } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { validateBody } from '../../utils/validation'
import { checkProjectLimit } from '../../utils/tierLimits'
import { generateUniqueSlug, generateApiKey } from '../../utils/slug'
import { badRequest } from '../../utils/errors'
import { createProjectSchema } from '../../../app/utils/validators'

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const db = getPrismaClient()
  const body = await readBody(event)
  const data = validateBody(body, createProjectSchema)

  // Check tier limit
  const projectCount = await db.project.count({ where: { ownerId: user.id } })
  const limitCheck = checkProjectLimit(user.tier, projectCount)
  if (!limitCheck.allowed) {
    throw badRequest(limitCheck.reason)
  }

  // Generate unique slug
  const slug = await generateUniqueSlug(data.name, async (candidate) => {
    const existing = await db.project.findUnique({ where: { slug: candidate } })
    return !!existing
  })

  const apiKey = generateApiKey()

  const project = await db.project.create({
    data: {
      name: data.name,
      description: data.description || null,
      websiteUrl: data.websiteUrl || null,
      slug,
      apiKey,
      ownerId: user.id,
    },
  })

  return project
})

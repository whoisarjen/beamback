import { defineEventHandler, getRouterParam } from 'h3'
import { requireProjectOwner } from '../../../utils/auth'
import { getPrismaClient } from '../../../utils/db'
import { generateApiKey } from '../../../utils/slug'

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')!
  await requireProjectOwner(event, projectId)
  const db = getPrismaClient()

  const newApiKey = generateApiKey()

  const project = await db.project.update({
    where: { id: projectId },
    data: { apiKey: newApiKey },
  })

  return { apiKey: project.apiKey }
})

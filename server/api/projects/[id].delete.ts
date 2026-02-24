import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { requireProjectOwner } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { badRequest } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')!
  const { project } = await requireProjectOwner(event, projectId)
  const db = getPrismaClient()

  const body = await readBody(event)
  if (!body?.confirmName || body.confirmName !== project.name) {
    throw badRequest('Project name does not match. Please confirm by typing the project name.')
  }

  await db.project.delete({ where: { id: projectId } })

  return { success: true }
})

import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { requireProjectOwner } from '../../utils/auth'
import { getPrismaClient } from '../../utils/db'
import { validateBody } from '../../utils/validation'
import { updateProjectSchema } from '../../../app/utils/validators'

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'id')!
  await requireProjectOwner(event, projectId)
  const db = getPrismaClient()

  const body = await readBody(event)
  const data = validateBody(body, updateProjectSchema)

  const project = await db.project.update({
    where: { id: projectId },
    data,
  })

  return project
})

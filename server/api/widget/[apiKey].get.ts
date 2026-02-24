import { defineEventHandler, getRouterParam } from 'h3'
import { getPrismaClient } from '../../utils/db'
import { notFound } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const apiKey = getRouterParam(event, 'apiKey')!
  const db = getPrismaClient()

  const project = await db.project.findUnique({
    where: { apiKey },
    select: {
      name: true,
      widgetColor: true,
      widgetPosition: true,
      widgetButtonText: true,
    },
  })

  if (!project) throw notFound()

  return project
})

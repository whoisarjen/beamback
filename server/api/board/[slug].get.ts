import { defineEventHandler, getRouterParam } from 'h3'
import { getPrismaClient } from '../../utils/db'
import { notFound } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const db = getPrismaClient()

  const project = await db.project.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      websiteUrl: true,
      isPublic: true,
      widgetColor: true,
      createdAt: true,
    },
  })

  if (!project || !project.isPublic) throw notFound()

  return project
})

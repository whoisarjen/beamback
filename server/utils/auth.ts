import type { H3Event } from 'h3'
import { getUserSession } from '#imports'
import { getPrismaClient } from './db'
import { unauthorized, notFound } from './errors'

export async function requireAuthUser(event: H3Event) {
  const session = await getUserSession(event)
  if (!session?.user?.userId) {
    throw unauthorized()
  }

  const db = getPrismaClient()
  const user = await db.user.findUnique({ where: { id: session.user.userId } })
  if (!user) throw unauthorized()

  return user
}

export async function requireProjectOwner(event: H3Event, projectId: string) {
  const user = await requireAuthUser(event)
  const db = getPrismaClient()
  const project = await db.project.findUnique({ where: { id: projectId } })

  // Return 404 for both non-existent and non-owned (prevent enumeration)
  if (!project || project.ownerId !== user.id) throw notFound()

  return { user, project }
}

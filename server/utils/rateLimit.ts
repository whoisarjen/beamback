import type { H3Event } from 'h3'
import { getClientIp } from './ip'
import { rateLimited } from './errors'
import { getPrismaClient } from './db'

interface RateLimitConfig {
  /** Max number of hits allowed in the window */
  limit: number
  /** Window duration in seconds */
  windowSeconds: number
  /** Key prefix to namespace different limiters */
  prefix: string
}

const FEEDBACK_LIMIT: RateLimitConfig = { limit: 10, windowSeconds: 3600, prefix: 'feedback' }
const VOTE_LIMIT: RateLimitConfig = { limit: 30, windowSeconds: 3600, prefix: 'vote' }
const AUTH_LIMIT: RateLimitConfig = { limit: 10, windowSeconds: 900, prefix: 'auth' }

async function checkRateLimit(identifier: string, config: RateLimitConfig): Promise<{ allowed: boolean; retryAfter: number }> {
  const prisma = getPrismaClient()
  const now = new Date()
  const windowStart = new Date(Math.floor(now.getTime() / (config.windowSeconds * 1000)) * config.windowSeconds * 1000)
  const windowEnd = new Date(windowStart.getTime() + config.windowSeconds * 1000)
  const key = `${config.prefix}:${identifier}`
  const window = windowStart.toISOString()

  // Upsert: increment hits or create new entry
  const entry = await prisma.rateLimit.upsert({
    where: { key_window: { key, window } },
    update: { hits: { increment: 1 } },
    create: { key, window, hits: 1, expiresAt: windowEnd },
  })

  if (entry.hits > config.limit) {
    const retryAfter = Math.ceil((windowEnd.getTime() - now.getTime()) / 1000)
    return { allowed: false, retryAfter }
  }

  return { allowed: true, retryAfter: 0 }
}

async function enforce(event: H3Event, config: RateLimitConfig): Promise<void> {
  const ip = getClientIp(event)
  const { allowed, retryAfter } = await checkRateLimit(ip, config)
  if (!allowed) {
    throw rateLimited(retryAfter)
  }
}

export async function enforceSubmitRateLimit(event: H3Event): Promise<void> {
  return enforce(event, FEEDBACK_LIMIT)
}

export async function enforceVoteRateLimit(event: H3Event): Promise<void> {
  return enforce(event, VOTE_LIMIT)
}

export async function enforceAuthRateLimit(event: H3Event): Promise<void> {
  return enforce(event, AUTH_LIMIT)
}

/**
 * Clean up expired rate limit entries. Call periodically (e.g. via cron or on deploy).
 */
export async function cleanupExpiredRateLimits(): Promise<number> {
  const prisma = getPrismaClient()
  const { count } = await prisma.rateLimit.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  })
  return count
}

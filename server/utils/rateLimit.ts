import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { H3Event } from 'h3'
import { getClientIp } from './ip'
import { rateLimited } from './errors'

let redis: Redis | null = null
let feedbackLimiter: Ratelimit | null = null
let voteLimiter: Ratelimit | null = null
let authLimiter: Ratelimit | null = null

function getRedis(): Redis | null {
  if (redis) return redis
  const url = process.env.NUXT_UPSTASH_REDIS_URL
  const token = process.env.NUXT_UPSTASH_REDIS_TOKEN
  if (!url || !token) return null
  redis = new Redis({ url, token })
  return redis
}

function getFeedbackLimiter(): Ratelimit | null {
  const r = getRedis()
  if (!r) return null
  if (!feedbackLimiter) {
    feedbackLimiter = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      prefix: 'rl:feedback',
    })
  }
  return feedbackLimiter
}

function getVoteLimiter(): Ratelimit | null {
  const r = getRedis()
  if (!r) return null
  if (!voteLimiter) {
    voteLimiter = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(30, '1 h'),
      prefix: 'rl:vote',
    })
  }
  return voteLimiter
}

function getAuthLimiter(): Ratelimit | null {
  const r = getRedis()
  if (!r) return null
  if (!authLimiter) {
    authLimiter = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(10, '15 m'),
      prefix: 'rl:auth',
    })
  }
  return authLimiter
}

export async function enforceSubmitRateLimit(event: H3Event): Promise<void> {
  const limiter = getFeedbackLimiter()
  if (!limiter) return // no Redis configured, skip
  const ip = getClientIp(event)
  const { success, reset } = await limiter.limit(ip)
  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    throw rateLimited(retryAfter)
  }
}

export async function enforceVoteRateLimit(event: H3Event): Promise<void> {
  const limiter = getVoteLimiter()
  if (!limiter) return
  const ip = getClientIp(event)
  const { success, reset } = await limiter.limit(ip)
  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    throw rateLimited(retryAfter)
  }
}

export async function enforceAuthRateLimit(event: H3Event): Promise<void> {
  const limiter = getAuthLimiter()
  if (!limiter) return
  const ip = getClientIp(event)
  const { success, reset } = await limiter.limit(ip)
  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    throw rateLimited(retryAfter)
  }
}

import { createHash } from 'node:crypto'
import type { H3Event } from 'h3'

export function getClientIp(event: H3Event): string {
  const realIp = event.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const forwarded = event.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',')
    return parts[parts.length - 1].trim()
  }

  return '127.0.0.1'
}

export function hashIp(ip: string, salt: string): string {
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

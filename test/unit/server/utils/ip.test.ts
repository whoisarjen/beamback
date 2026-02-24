import { describe, it, expect } from 'vitest'
import { getClientIp, hashIp } from '../../../../server/utils/ip'

function mockEvent(headers: Record<string, string> = {}) {
  return {
    node: { req: { socket: { remoteAddress: '192.168.1.1' } } },
    headers: new Headers(headers),
  } as any
}

describe('server/utils/ip', () => {
  describe('getClientIp', () => {
    it('returns x-real-ip when present', () => {
      const event = mockEvent({ 'x-real-ip': '10.0.0.1' })
      expect(getClientIp(event)).toBe('10.0.0.1')
    })

    it('returns last entry from x-forwarded-for when x-real-ip is missing', () => {
      const event = mockEvent({ 'x-forwarded-for': '10.0.0.1, 172.16.0.1' })
      expect(getClientIp(event)).toBe('172.16.0.1')
    })

    it('falls back to 127.0.0.1 when no headers are present', () => {
      const event = mockEvent()
      expect(getClientIp(event)).toBe('127.0.0.1')
    })
  })

  describe('hashIp', () => {
    it('returns a hex string', () => {
      const hash = hashIp('10.0.0.1', 'test-salt')
      expect(hash).toMatch(/^[a-f0-9]+$/)
    })

    it('produces consistent output for same input', () => {
      const hash1 = hashIp('10.0.0.1', 'salt')
      const hash2 = hashIp('10.0.0.1', 'salt')
      expect(hash1).toBe(hash2)
    })
  })
})

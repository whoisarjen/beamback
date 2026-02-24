import { describe, it, expect } from 'vitest'
import {
  checkProjectLimit,
  checkFeedbackMonthlyLimit,
  checkSubmissionRateLimit,
  checkVoteRateLimit,
} from '../../../../server/utils/tierLimits'

describe('server/utils/tierLimits', () => {
  describe('checkProjectLimit', () => {
    it('allows FREE tier under limit (1 of 2)', () => {
      expect(checkProjectLimit('FREE', 1)).toEqual({ allowed: true })
    })

    it('denies FREE tier at limit (2 of 2)', () => {
      const result = checkProjectLimit('FREE', 2)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBeDefined()
    })

    it('allows PRO tier with any count', () => {
      expect(checkProjectLimit('PRO', 100)).toEqual({ allowed: true })
    })
  })

  describe('checkFeedbackMonthlyLimit', () => {
    it('allows FREE tier under limit (49 of 50)', () => {
      expect(checkFeedbackMonthlyLimit('FREE', 49)).toEqual({ allowed: true })
    })

    it('denies FREE tier at limit (50 of 50)', () => {
      const result = checkFeedbackMonthlyLimit('FREE', 50)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBeDefined()
    })

    it('allows PRO tier with any count', () => {
      expect(checkFeedbackMonthlyLimit('PRO', 10000)).toEqual({ allowed: true })
    })
  })

  describe('checkSubmissionRateLimit', () => {
    it('allows FREE tier under limit (9 of 10)', () => {
      expect(checkSubmissionRateLimit('FREE', 9)).toEqual({ allowed: true })
    })

    it('denies FREE tier at limit (10 of 10)', () => {
      const result = checkSubmissionRateLimit('FREE', 10)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBeDefined()
    })

    it('allows PRO tier under its higher limit (49 of 50)', () => {
      expect(checkSubmissionRateLimit('PRO', 49)).toEqual({ allowed: true })
    })

    it('denies PRO tier at limit (50 of 50)', () => {
      const result = checkSubmissionRateLimit('PRO', 50)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBeDefined()
    })
  })

  describe('checkVoteRateLimit', () => {
    it('allows FREE tier under limit (29 of 30)', () => {
      expect(checkVoteRateLimit('FREE', 29)).toEqual({ allowed: true })
    })

    it('denies FREE tier at limit (30 of 30)', () => {
      const result = checkVoteRateLimit('FREE', 30)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBeDefined()
    })

    it('allows PRO tier under its higher limit (99 of 100)', () => {
      expect(checkVoteRateLimit('PRO', 99)).toEqual({ allowed: true })
    })

    it('denies PRO tier at limit (100 of 100)', () => {
      const result = checkVoteRateLimit('PRO', 100)
      expect(result.allowed).toBe(false)
      expect(result.reason).toBeDefined()
    })
  })
})

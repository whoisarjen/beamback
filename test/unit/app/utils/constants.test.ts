import { describe, it, expect } from 'vitest'
import {
  TIER_LIMITS,
  FEEDBACK_STATUSES,
  STATUS_LABELS,
  STATUS_COLORS,
} from '../../../../app/utils/constants'

describe('TIER_LIMITS', () => {
  it('defines FREE tier with correct limits', () => {
    expect(TIER_LIMITS.FREE).toEqual({
      maxProjects: 2,
      maxFeedbackPerMonth: 50,
      maxSubmissionsPerHourPerIp: 10,
      maxVotesPerHourPerIp: 30,
    })
  })

  it('defines PRO tier with unlimited projects and feedback', () => {
    expect(TIER_LIMITS.PRO).toEqual({
      maxProjects: Infinity,
      maxFeedbackPerMonth: Infinity,
      maxSubmissionsPerHourPerIp: 50,
      maxVotesPerHourPerIp: 100,
    })
  })

  it('has stricter FREE limits than PRO limits', () => {
    expect(TIER_LIMITS.FREE.maxProjects).toBeLessThan(TIER_LIMITS.PRO.maxProjects)
    expect(TIER_LIMITS.FREE.maxFeedbackPerMonth).toBeLessThan(TIER_LIMITS.PRO.maxFeedbackPerMonth)
    expect(TIER_LIMITS.FREE.maxSubmissionsPerHourPerIp).toBeLessThan(TIER_LIMITS.PRO.maxSubmissionsPerHourPerIp)
    expect(TIER_LIMITS.FREE.maxVotesPerHourPerIp).toBeLessThan(TIER_LIMITS.PRO.maxVotesPerHourPerIp)
  })
})

describe('FEEDBACK_STATUSES', () => {
  it('contains all five expected statuses in order', () => {
    expect(FEEDBACK_STATUSES).toEqual(['NEW', 'PLANNED', 'IN_PROGRESS', 'DONE', 'CLOSED'])
  })
})

describe('STATUS_LABELS', () => {
  it('maps every status to a human-readable label', () => {
    expect(STATUS_LABELS).toEqual({
      NEW: 'New',
      PLANNED: 'Planned',
      IN_PROGRESS: 'In Progress',
      DONE: 'Done',
      CLOSED: 'Closed',
    })
  })

  it('has a label for every status in FEEDBACK_STATUSES', () => {
    for (const status of FEEDBACK_STATUSES) {
      expect(STATUS_LABELS).toHaveProperty(status)
    }
  })
})

describe('STATUS_COLORS', () => {
  it('has a color entry for every status in FEEDBACK_STATUSES', () => {
    for (const status of FEEDBACK_STATUSES) {
      expect(STATUS_COLORS).toHaveProperty(status)
      expect(typeof STATUS_COLORS[status as keyof typeof STATUS_COLORS]).toBe('string')
    }
  })
})

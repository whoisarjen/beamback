import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  formatDate,
  formatRelativeDate,
  formatNumber,
  truncateText,
} from '../../../../app/utils/formatters'

describe('formatDate', () => {
  it('formats a Date object to readable string', () => {
    const date = new Date('2025-01-15T12:00:00Z')
    expect(formatDate(date)).toBe('Jan 15, 2025')
  })

  it('formats an ISO date string', () => {
    expect(formatDate('2025-12-03T00:00:00Z')).toBe('Dec 3, 2025')
  })

  it('formats a date with single-digit day without leading zero', () => {
    expect(formatDate('2025-03-05T00:00:00Z')).toBe('Mar 5, 2025')
  })
})

describe('formatRelativeDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns "just now" for dates less than a minute ago', () => {
    const thirtySecondsAgo = new Date('2025-06-15T11:59:30Z')
    expect(formatRelativeDate(thirtySecondsAgo)).toBe('just now')
  })

  it('returns minutes ago for dates within the last hour', () => {
    const fiveMinutesAgo = new Date('2025-06-15T11:55:00Z')
    expect(formatRelativeDate(fiveMinutesAgo)).toBe('5 minutes ago')
  })

  it('returns hours ago for dates within the last day', () => {
    const twoHoursAgo = new Date('2025-06-15T10:00:00Z')
    expect(formatRelativeDate(twoHoursAgo)).toBe('2 hours ago')
  })

  it('returns days ago for dates within the last week', () => {
    const threeDaysAgo = new Date('2025-06-12T12:00:00Z')
    expect(formatRelativeDate(threeDaysAgo)).toBe('3 days ago')
  })

  it('returns the full formatted date for dates older than 7 days', () => {
    const twoWeeksAgo = new Date('2025-06-01T12:00:00Z')
    expect(formatRelativeDate(twoWeeksAgo)).toBe('Jun 1, 2025')
  })

  it('accepts an ISO string input', () => {
    expect(formatRelativeDate('2025-06-15T11:58:00Z')).toBe('2 minutes ago')
  })
})

describe('formatNumber', () => {
  it('returns plain number for values under 1000', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(999)).toBe('999')
  })

  it('formats thousands with k suffix', () => {
    expect(formatNumber(1200)).toBe('1.2k')
    expect(formatNumber(15000)).toBe('15k')
  })

  it('formats millions with M suffix', () => {
    expect(formatNumber(1500000)).toBe('1.5M')
  })
})

describe('truncateText', () => {
  it('returns the full text when shorter than maxLength', () => {
    expect(truncateText('hello', 10)).toBe('hello')
  })

  it('truncates and appends ellipsis when text exceeds maxLength', () => {
    expect(truncateText('hello world this is long', 10)).toBe('hello w...')
  })
})

import { describe, it, expect } from 'vitest'
import {
  createProjectSchema,
  updateProjectSchema,
  submitFeedbackSchema,
  updateFeedbackSchema,
  waitlistSchema,
  paginationSchema,
} from '../../../../app/utils/validators'

// ---------------------------------------------------------------------------
// createProjectSchema
// ---------------------------------------------------------------------------
describe('createProjectSchema', () => {
  it('accepts valid project data with all fields', () => {
    const result = createProjectSchema.safeParse({
      name: 'My Project',
      description: 'A short description',
      websiteUrl: 'https://example.com',
    })
    expect(result.success).toBe(true)
  })

  it('accepts valid project data with only required fields', () => {
    const result = createProjectSchema.safeParse({ name: 'AB' })
    expect(result.success).toBe(true)
  })

  it('rejects a name shorter than 2 characters', () => {
    const result = createProjectSchema.safeParse({ name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects a name longer than 50 characters', () => {
    const result = createProjectSchema.safeParse({ name: 'x'.repeat(51) })
    expect(result.success).toBe(false)
  })

  it('rejects a description longer than 500 characters', () => {
    const result = createProjectSchema.safeParse({
      name: 'Valid',
      description: 'x'.repeat(501),
    })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid websiteUrl', () => {
    const result = createProjectSchema.safeParse({
      name: 'Valid',
      websiteUrl: 'not-a-url',
    })
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// updateProjectSchema
// ---------------------------------------------------------------------------
describe('updateProjectSchema', () => {
  it('accepts partial project fields', () => {
    const result = updateProjectSchema.safeParse({ name: 'Updated' })
    expect(result.success).toBe(true)
  })

  it('accepts widget configuration fields', () => {
    const result = updateProjectSchema.safeParse({
      widgetColor: '#ff5500',
      widgetPosition: 'bottom-right',
      widgetButtonText: 'Feedback',
      isPublic: true,
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid hex color for widgetColor', () => {
    const result = updateProjectSchema.safeParse({ widgetColor: 'red' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid widgetPosition value', () => {
    const result = updateProjectSchema.safeParse({ widgetPosition: 'center' })
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// submitFeedbackSchema
// ---------------------------------------------------------------------------
describe('submitFeedbackSchema', () => {
  it('accepts valid feedback with all fields', () => {
    const result = submitFeedbackSchema.safeParse({
      title: 'Add dark mode',
      description: 'Would be nice to have a dark theme.',
      authorEmail: 'user@example.com',
      authorName: 'Jane',
    })
    expect(result.success).toBe(true)
  })

  it('accepts feedback with only the required title', () => {
    const result = submitFeedbackSchema.safeParse({ title: 'Short idea' })
    expect(result.success).toBe(true)
  })

  it('rejects a title shorter than 3 characters', () => {
    const result = submitFeedbackSchema.safeParse({ title: 'AB' })
    expect(result.success).toBe(false)
  })

  it('rejects a title longer than 200 characters', () => {
    const result = submitFeedbackSchema.safeParse({ title: 'x'.repeat(201) })
    expect(result.success).toBe(false)
  })

  it('rejects an all-caps title', () => {
    const result = submitFeedbackSchema.safeParse({ title: 'FIX THIS NOW PLEASE' })
    expect(result.success).toBe(false)
  })

  it('rejects a description longer than 5000 characters', () => {
    const result = submitFeedbackSchema.safeParse({
      title: 'Valid title',
      description: 'x'.repeat(5001),
    })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid authorEmail', () => {
    const result = submitFeedbackSchema.safeParse({
      title: 'Valid title',
      authorEmail: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })

  it('rejects authorName longer than 100 characters', () => {
    const result = submitFeedbackSchema.safeParse({
      title: 'Valid title',
      authorName: 'x'.repeat(101),
    })
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// updateFeedbackSchema
// ---------------------------------------------------------------------------
describe('updateFeedbackSchema', () => {
  it('accepts a valid status update', () => {
    const result = updateFeedbackSchema.safeParse({ status: 'PLANNED' })
    expect(result.success).toBe(true)
  })

  it('accepts all valid status values', () => {
    for (const status of ['NEW', 'PLANNED', 'IN_PROGRESS', 'DONE', 'CLOSED']) {
      const result = updateFeedbackSchema.safeParse({ status })
      expect(result.success).toBe(true)
    }
  })

  it('rejects an invalid status value', () => {
    const result = updateFeedbackSchema.safeParse({ status: 'INVALID' })
    expect(result.success).toBe(false)
  })

  it('accepts optional adminNote and isRead', () => {
    const result = updateFeedbackSchema.safeParse({
      status: 'NEW',
      adminNote: 'Reviewed',
      isRead: true,
    })
    expect(result.success).toBe(true)
  })

  it('validates isRead as boolean', () => {
    const result = updateFeedbackSchema.safeParse({
      status: 'NEW',
      isRead: 'yes',
    })
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// waitlistSchema
// ---------------------------------------------------------------------------
describe('waitlistSchema', () => {
  it('accepts a valid email', () => {
    const result = waitlistSchema.safeParse({ email: 'user@example.com' })
    expect(result.success).toBe(true)
  })

  it('accepts email with optional source', () => {
    const result = waitlistSchema.safeParse({
      email: 'user@example.com',
      source: 'landing-page',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing email', () => {
    const result = waitlistSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('rejects an invalid email', () => {
    const result = waitlistSchema.safeParse({ email: 'bad' })
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// paginationSchema
// ---------------------------------------------------------------------------
describe('paginationSchema', () => {
  it('uses default page=1 and limit=20 when no input', () => {
    const result = paginationSchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(1)
      expect(result.data.limit).toBe(20)
    }
  })

  it('accepts custom page and limit values', () => {
    const result = paginationSchema.safeParse({ page: 3, limit: 50 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(3)
      expect(result.data.limit).toBe(50)
    }
  })

  it('rejects page less than 1', () => {
    const result = paginationSchema.safeParse({ page: 0 })
    expect(result.success).toBe(false)
  })

  it('rejects non-integer page', () => {
    const result = paginationSchema.safeParse({ page: 1.5 })
    expect(result.success).toBe(false)
  })

  it('rejects limit less than 1', () => {
    const result = paginationSchema.safeParse({ limit: 0 })
    expect(result.success).toBe(false)
  })

  it('rejects limit greater than 100', () => {
    const result = paginationSchema.safeParse({ limit: 101 })
    expect(result.success).toBe(false)
  })
})

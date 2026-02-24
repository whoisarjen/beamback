import { describe, it, expect } from 'vitest'
import { notFound, unauthorized, forbidden, badRequest, rateLimited } from '../../../../server/utils/errors'

describe('server/utils/errors', () => {
  it('notFound returns 404 with default message', () => {
    const err = notFound()
    expect(err.statusCode).toBe(404)
    expect(err.statusMessage).toBe('Not Found')
  })

  it('notFound accepts a custom message', () => {
    const err = notFound('Project not found')
    expect(err.statusCode).toBe(404)
    expect(err.statusMessage).toBe('Project not found')
  })

  it('unauthorized returns 401 with default message', () => {
    const err = unauthorized()
    expect(err.statusCode).toBe(401)
    expect(err.statusMessage).toBe('Unauthorized')
  })

  it('forbidden returns 403 with default message', () => {
    const err = forbidden()
    expect(err.statusCode).toBe(403)
    expect(err.statusMessage).toBe('Forbidden')
  })

  it('badRequest returns 400 with validation data', () => {
    const fieldErrors = { email: ['Required'] }
    const err = badRequest('Validation failed', fieldErrors)
    expect(err.statusCode).toBe(400)
    expect(err.statusMessage).toBe('Validation failed')
    expect(err.data).toEqual(fieldErrors)
  })

  it('rateLimited returns 429 with retryAfter in data', () => {
    const err = rateLimited(60)
    expect(err.statusCode).toBe(429)
    expect(err.statusMessage).toBe('Too Many Requests')
    expect(err.data).toEqual({ retryAfter: 60 })
  })
})

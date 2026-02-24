import { createError } from 'h3'

export function notFound(message = 'Not Found') {
  return createError({ statusCode: 404, statusMessage: message })
}

export function unauthorized(message = 'Unauthorized') {
  return createError({ statusCode: 401, statusMessage: message })
}

export function forbidden(message = 'Forbidden') {
  return createError({ statusCode: 403, statusMessage: message })
}

export function badRequest(message = 'Bad Request', data?: unknown) {
  return createError({ statusCode: 400, statusMessage: message, data })
}

export function rateLimited(retryAfter?: number) {
  return createError({
    statusCode: 429,
    statusMessage: 'Too Many Requests',
    data: retryAfter ? { retryAfter } : undefined,
  })
}

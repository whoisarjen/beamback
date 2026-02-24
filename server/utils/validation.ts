import type { ZodSchema } from 'zod'
import { badRequest } from './errors'

export function validateBody<T>(body: unknown, schema: ZodSchema<T>): T {
  const result = schema.safeParse(body)
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    throw badRequest('Validation failed', fieldErrors)
  }
  return result.data
}

export function validateQuery<T>(query: unknown, schema: ZodSchema<T>): T {
  const result = schema.safeParse(query)
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    throw badRequest('Invalid query parameters', fieldErrors)
  }
  return result.data
}

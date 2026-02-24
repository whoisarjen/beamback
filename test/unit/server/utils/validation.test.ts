import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { validateBody, validateQuery } from '../../../../server/utils/validation'

const testSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

describe('server/utils/validation', () => {
  describe('validateBody', () => {
    it('returns parsed data for valid input', () => {
      const result = validateBody({ name: 'Alice', email: 'alice@test.com' }, testSchema)
      expect(result).toEqual({ name: 'Alice', email: 'alice@test.com' })
    })

    it('throws 400 with field errors for invalid input', () => {
      try {
        validateBody({ name: '', email: 'not-an-email' }, testSchema)
        expect.fail('should have thrown')
      } catch (err: any) {
        expect(err.statusCode).toBe(400)
        expect(err.data).toBeDefined()
      }
    })

    it('throws 400 when body is null', () => {
      try {
        validateBody(null, testSchema)
        expect.fail('should have thrown')
      } catch (err: any) {
        expect(err.statusCode).toBe(400)
      }
    })
  })

  describe('validateQuery', () => {
    it('returns parsed data for valid query params', () => {
      const querySchema = z.object({
        page: z.coerce.number().int().positive(),
      })
      const result = validateQuery({ page: '3' }, querySchema)
      expect(result).toEqual({ page: 3 })
    })

    it('throws 400 for invalid query params', () => {
      const querySchema = z.object({
        page: z.coerce.number().int().positive(),
      })
      try {
        validateQuery({ page: 'abc' }, querySchema)
        expect.fail('should have thrown')
      } catch (err: any) {
        expect(err.statusCode).toBe(400)
        expect(err.data).toBeDefined()
      }
    })

    it('throws 400 when required query param is missing', () => {
      const querySchema = z.object({
        page: z.coerce.number().int().positive(),
      })
      try {
        validateQuery({}, querySchema)
        expect.fail('should have thrown')
      } catch (err: any) {
        expect(err.statusCode).toBe(400)
      }
    })
  })
})

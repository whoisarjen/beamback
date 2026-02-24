import { describe, it, expect, vi } from 'vitest'
import { slugify, generateUniqueSlug, generateApiKey } from '../../../../server/utils/slug'

describe('server/utils/slug', () => {
  describe('slugify', () => {
    it('converts text to lowercase with hyphens', () => {
      expect(slugify('My Cool Project')).toBe('my-cool-project')
    })

    it('replaces non-alphanumeric characters with hyphens', () => {
      expect(slugify('hello@world! foo')).toBe('hello-world-foo')
    })

    it('trims leading and trailing hyphens', () => {
      expect(slugify('--hello--world--')).toBe('hello-world')
    })

    it('collapses multiple consecutive hyphens', () => {
      expect(slugify('hello   world')).toBe('hello-world')
    })

    it('truncates to 50 characters maximum', () => {
      const long = 'a'.repeat(60)
      const result = slugify(long)
      expect(result.length).toBeLessThanOrEqual(50)
    })
  })

  describe('generateUniqueSlug', () => {
    it('returns base slug when it does not exist', async () => {
      const checkExists = vi.fn().mockResolvedValue(false)
      const slug = await generateUniqueSlug('My Project', checkExists)
      expect(slug).toBe('my-project')
      expect(checkExists).toHaveBeenCalledWith('my-project')
    })

    it('appends -2 when base slug already exists', async () => {
      const checkExists = vi.fn()
        .mockResolvedValueOnce(true)   // "my-project" exists
        .mockResolvedValueOnce(false)  // "my-project-2" does not
      const slug = await generateUniqueSlug('My Project', checkExists)
      expect(slug).toBe('my-project-2')
    })

    it('increments suffix until a free slug is found', async () => {
      const checkExists = vi.fn()
        .mockResolvedValueOnce(true)   // "my-project" exists
        .mockResolvedValueOnce(true)   // "my-project-2" exists
        .mockResolvedValueOnce(false)  // "my-project-3" does not
      const slug = await generateUniqueSlug('My Project', checkExists)
      expect(slug).toBe('my-project-3')
      expect(checkExists).toHaveBeenCalledTimes(3)
    })
  })

  describe('generateApiKey', () => {
    it('starts with "ak_" prefix', () => {
      const key = generateApiKey()
      expect(key.startsWith('ak_')).toBe(true)
    })

    it('has 24 total characters (ak_ + 21 chars)', () => {
      const key = generateApiKey()
      expect(key.length).toBe(24)
    })
  })
})

import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(500).optional(),
  websiteUrl: z.string().url().optional(),
})

export const updateProjectSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  description: z.string().max(500).optional(),
  websiteUrl: z.string().url().optional(),
  isPublic: z.boolean().optional(),
  widgetColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  widgetPosition: z.enum(['bottom-right', 'bottom-left']).optional(),
  widgetButtonText: z.string().max(30).optional(),
})

export const submitFeedbackSchema = z.object({
  title: z.string().min(3).max(200).refine(
    (val) => {
      if (val.length < 5) return true
      return val !== val.toUpperCase()
    },
    { message: 'Title cannot be all uppercase' },
  ),
  description: z.string().max(5000).optional(),
  authorEmail: z.string().email().optional(),
  authorName: z.string().max(100).optional(),
})

export const updateFeedbackSchema = z.object({
  status: z.enum(['NEW', 'PLANNED', 'IN_PROGRESS', 'DONE', 'CLOSED']).optional(),
  adminNote: z.string().max(1000).optional(),
  isRead: z.boolean().optional(),
})

export const waitlistSchema = z.object({
  email: z.string().email(),
  source: z.string().max(50).optional(),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

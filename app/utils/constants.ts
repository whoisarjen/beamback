export const TIER_LIMITS = {
  FREE: {
    maxProjects: 2,
    maxFeedbackPerMonth: 50,
    maxSubmissionsPerHourPerIp: 10,
    maxVotesPerHourPerIp: 30,
  },
  PRO: {
    maxProjects: Infinity,
    maxFeedbackPerMonth: Infinity,
    maxSubmissionsPerHourPerIp: 50,
    maxVotesPerHourPerIp: 100,
  },
} as const

export type Tier = keyof typeof TIER_LIMITS

export const FEEDBACK_STATUSES = ['NEW', 'PLANNED', 'IN_PROGRESS', 'DONE', 'CLOSED'] as const

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number]

export const STATUS_LABELS: Record<FeedbackStatus, string> = {
  NEW: 'New',
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  CLOSED: 'Closed',
}

export const STATUS_COLORS: Record<FeedbackStatus, string> = {
  NEW: '#3A82FF',
  PLANNED: '#8B5CF6',
  IN_PROGRESS: '#F59E0B',
  DONE: '#10B981',
  CLOSED: '#6B7280',
}

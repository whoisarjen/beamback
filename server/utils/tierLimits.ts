import { TIER_LIMITS, type Tier } from '../../app/utils/constants'

type LimitResult = { allowed: true } | { allowed: false; reason: string }

export function checkProjectLimit(tier: Tier, currentCount: number): LimitResult {
  const limit = TIER_LIMITS[tier].maxProjects
  if (currentCount < limit) return { allowed: true }
  return { allowed: false, reason: `You've reached the maximum of ${limit} projects on the ${tier} plan.` }
}

export function checkFeedbackMonthlyLimit(tier: Tier, currentCount: number): LimitResult {
  const limit = TIER_LIMITS[tier].maxFeedbackPerMonth
  if (currentCount < limit) return { allowed: true }
  return { allowed: false, reason: `Monthly feedback limit of ${limit} reached on the ${tier} plan.` }
}

export function checkSubmissionRateLimit(tier: Tier, currentCount: number): LimitResult {
  const limit = TIER_LIMITS[tier].maxSubmissionsPerHourPerIp
  if (currentCount < limit) return { allowed: true }
  return { allowed: false, reason: `Submission rate limit of ${limit}/hour reached.` }
}

export function checkVoteRateLimit(tier: Tier, currentCount: number): LimitResult {
  const limit = TIER_LIMITS[tier].maxVotesPerHourPerIp
  if (currentCount < limit) return { allowed: true }
  return { allowed: false, reason: `Vote rate limit of ${limit}/hour reached.` }
}

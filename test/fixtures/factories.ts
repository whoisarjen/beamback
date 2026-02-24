export function buildUser(overrides: Record<string, any> = {}) {
  return {
    id: 'user_test_1',
    email: 'test@example.com',
    name: 'Test User',
    avatarUrl: null,
    provider: 'google',
    providerId: 'google_123',
    tier: 'FREE' as const,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    ...overrides,
  }
}

export function buildProject(overrides: Record<string, any> = {}) {
  return {
    id: 'proj_test_1',
    name: 'My Project',
    slug: 'my-project',
    description: 'Test project',
    apiKey: 'ak_test_abc123def456ghi',
    websiteUrl: 'https://example.com',
    isPublic: true,
    ownerId: 'user_test_1',
    widgetColor: '#3A82FF',
    widgetPosition: 'bottom-right',
    widgetButtonText: 'Feedback',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    ...overrides,
  }
}

export function buildFeedback(overrides: Record<string, any> = {}) {
  return {
    id: 'fb_test_1',
    title: 'Add dark mode',
    description: 'It would be great to have a dark mode option.',
    status: 'NEW' as const,
    authorEmail: 'submitter@example.com',
    authorName: 'Jane',
    ipHash: 'a1b2c3d4e5f6',
    adminNote: null,
    isRead: false,
    projectId: 'proj_test_1',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    ...overrides,
  }
}

export function buildVote(overrides: Record<string, any> = {}) {
  return {
    id: 'vote_test_1',
    feedbackId: 'fb_test_1',
    userId: null,
    ipHash: 'a1b2c3d4e5f6',
    createdAt: new Date('2025-01-01'),
    ...overrides,
  }
}

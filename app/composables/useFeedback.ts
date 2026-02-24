import type { FeedbackStatus } from '~/utils/constants'

interface FeedbackItem {
  id: string
  title: string
  description: string | null
  status: FeedbackStatus
  isRead: boolean
  adminNote: string | null
  authorEmail: string | null
  authorName: string | null
  voteCount: number
  projectId: string
  createdAt: string
  updatedAt: string
}

interface FeedbackParams {
  projectId: string
  status?: FeedbackStatus
  search?: string
  page?: number
  limit?: number
}

interface FeedbackResponse {
  data: FeedbackItem[]
  total: number
  page: number
  limit: number
}

interface UpdateFeedbackData {
  status?: FeedbackStatus
  adminNote?: string
  isRead?: boolean
}

export function useFeedback() {
  const feedback = ref<FeedbackItem[]>([])
  const total = ref(0)
  const page = ref(1)
  const limit = ref(20)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchFeedback(params: FeedbackParams) {
    loading.value = true
    error.value = null
    try {
      const query: Record<string, string | number> = {
        projectId: params.projectId,
      }
      if (params.status) query.status = params.status
      if (params.search) query.search = params.search
      if (params.page) query.page = params.page
      if (params.limit) query.limit = params.limit

      const result = await $fetch<FeedbackResponse>('/api/feedback', { query })
      feedback.value = result.data
      total.value = result.total
      page.value = result.page
      limit.value = result.limit
    } catch (e: any) {
      error.value = e?.data?.message || 'Failed to fetch feedback'
    } finally {
      loading.value = false
    }
  }

  async function updateFeedback(id: string, data: UpdateFeedbackData) {
    error.value = null
    try {
      const updated = await $fetch<FeedbackItem>(`/api/feedback/${id}`, {
        method: 'PUT',
        body: data,
      })
      const index = feedback.value.findIndex((f) => f.id === id)
      if (index !== -1) {
        feedback.value[index] = { ...feedback.value[index], ...updated }
      }
      return updated
    } catch (e: any) {
      error.value = e?.data?.message || 'Failed to update feedback'
      throw e
    }
  }

  async function deleteFeedback(id: string) {
    error.value = null
    try {
      await $fetch(`/api/feedback/${id}`, { method: 'DELETE' })
      feedback.value = feedback.value.filter((f) => f.id !== id)
      total.value = Math.max(0, total.value - 1)
    } catch (e: any) {
      error.value = e?.data?.message || 'Failed to delete feedback'
      throw e
    }
  }

  return {
    feedback,
    total,
    page,
    limit,
    loading,
    error,
    fetchFeedback,
    updateFeedback,
    deleteFeedback,
  }
}

<script setup lang="ts">
import { FEEDBACK_STATUSES, type FeedbackStatus } from '~/utils/constants'

definePageMeta({
  layout: 'board',
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Fetch project info
const { data: project, error: projectError } = await useFetch(`/api/board/${slug.value}`)

if (projectError.value || !project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Board not found',
  })
}

useHead({
  title: `${project.value.name} — Feedback Board`,
})

// Tabs
const activeTab = ref<'feedback' | 'roadmap'>('feedback')

// Filters
const statusFilter = ref('')
const searchQuery = ref('')
const searchOpen = ref(false)
const page = ref(1)
const limit = 15

// Feedback data
interface FeedbackItem {
  id: string
  title: string
  description?: string | null
  status: FeedbackStatus
  authorName?: string | null
  createdAt: string
  voteCount: number
}

const feedbackItems = ref<FeedbackItem[]>([])
const feedbackTotal = ref(0)
const feedbackLoading = ref(false)
const feedbackError = ref('')

const hasMore = computed(() => feedbackItems.value.length < feedbackTotal.value)

async function fetchFeedback(reset = false) {
  if (reset) {
    page.value = 1
    feedbackItems.value = []
  }

  feedbackLoading.value = true
  feedbackError.value = ''

  try {
    const query: Record<string, unknown> = {
      page: page.value,
      limit,
    }
    if (statusFilter.value) query.status = statusFilter.value
    if (searchQuery.value.trim()) query.search = searchQuery.value.trim()

    const result = await $fetch<{
      data: FeedbackItem[]
      total: number
      page: number
      limit: number
    }>(`/api/board/${slug.value}/feedback`, { query })

    if (reset || page.value === 1) {
      feedbackItems.value = result.data
    } else {
      feedbackItems.value = [...feedbackItems.value, ...result.data]
    }
    feedbackTotal.value = result.total
  } catch {
    feedbackError.value = 'Failed to load feedback.'
  } finally {
    feedbackLoading.value = false
  }
}

function loadMore() {
  page.value++
  fetchFeedback()
}

// Watch filter changes
watch(statusFilter, () => fetchFeedback(true))

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => fetchFeedback(true), 350)
})

function onFeedbackSubmitted() {
  fetchFeedback(true)
}

// Initial load
await fetchFeedback(true)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <BoardBoardHeader :project="project!" />

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-cosmo-border mb-6">
      <button
        class="px-5 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:ring-inset rounded-t-lg"
        :class="
          activeTab === 'feedback'
            ? 'text-cosmo-blue border-b-2 border-cosmo-blue'
            : 'text-cosmo-text-muted hover:text-cosmo-text'
        "
        @click="activeTab = 'feedback'"
      >
        <Icon name="lucide:message-square" class="w-4 h-4 mr-1.5 inline-block" />
        Feedback
      </button>
      <button
        class="px-5 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:ring-inset rounded-t-lg"
        :class="
          activeTab === 'roadmap'
            ? 'text-cosmo-blue border-b-2 border-cosmo-blue'
            : 'text-cosmo-text-muted hover:text-cosmo-text'
        "
        @click="activeTab = 'roadmap'"
      >
        <Icon name="lucide:map" class="w-4 h-4 mr-1.5 inline-block" />
        Roadmap
      </button>
    </div>

    <!-- Feedback Tab -->
    <div v-if="activeTab === 'feedback'" class="space-y-6">
      <!-- Submit Form -->
      <BoardFeedbackSubmitForm
        :slug="slug"
        @submitted="onFeedbackSubmitted"
      />

      <!-- Filters -->
      <div class="space-y-3">
        <div class="flex items-center justify-between gap-3">
          <BoardStatusFilter
            v-model="statusFilter"
            :statuses="FEEDBACK_STATUSES"
            class="flex-1 min-w-0"
          />

          <!-- Search toggle (mobile) / inline (desktop) -->
          <button
            class="md:hidden shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-cosmo-border text-cosmo-text-muted hover:text-cosmo-text hover:border-cosmo-border-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            :class="searchOpen ? 'bg-cosmo-elevated' : 'bg-cosmo-surface'"
            :aria-label="searchOpen ? 'Close search' : 'Open search'"
            @click="searchOpen = !searchOpen"
          >
            <Icon :name="searchOpen ? 'lucide:x' : 'lucide:search'" class="w-5 h-5" />
          </button>
        </div>

        <!-- Search bar -->
        <div
          :class="searchOpen ? 'block' : 'hidden md:block'"
        >
          <div class="relative">
            <Icon
              name="lucide:search"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmo-text-dim"
            />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search feedback..."
              class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg pl-10 pr-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="feedbackError" class="text-center py-8 text-cosmo-error">
        {{ feedbackError }}
      </div>

      <div v-else-if="feedbackItems.length" class="space-y-3">
        <BoardFeedbackCard
          v-for="item in feedbackItems"
          :key="item.id"
          :feedback="item"
          :slug="slug"
        />

        <div v-if="hasMore" class="flex justify-center pt-4">
          <button
            :disabled="feedbackLoading"
            class="bg-cosmo-surface border border-cosmo-border text-cosmo-text-muted hover:text-cosmo-text hover:border-cosmo-border-bright rounded-lg px-6 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue disabled:opacity-50 flex items-center gap-2"
            @click="loadMore"
          >
            <SharedLoadingSpinner v-if="feedbackLoading" size="sm" />
            {{ feedbackLoading ? 'Loading...' : 'Load more' }}
          </button>
        </div>
      </div>

      <div
        v-else-if="!feedbackLoading"
        class="text-center py-16"
      >
        <Icon name="lucide:message-circle" class="w-12 h-12 text-cosmo-text-dim mx-auto mb-3" />
        <p class="text-cosmo-text-muted text-lg font-medium">No feedback yet</p>
        <p class="text-cosmo-text-dim text-sm mt-1">Be the first to share your thoughts!</p>
      </div>

      <div v-if="feedbackLoading && !feedbackItems.length" class="flex justify-center py-16">
        <SharedLoadingSpinner size="lg" />
      </div>
    </div>

    <!-- Roadmap Tab -->
    <div v-if="activeTab === 'roadmap'">
      <BoardRoadmapView :slug="slug" />
    </div>
  </div>
</template>

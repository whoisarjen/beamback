<script setup lang="ts">
import { STATUS_LABELS, type FeedbackStatus } from '~/utils/constants'

const props = defineProps<{
  slug: string
}>()

interface FeedbackItem {
  id: string
  title: string
  description?: string | null
  status: FeedbackStatus
  authorName?: string | null
  createdAt: string
  voteCount: number
}

interface FeedbackResponse {
  data: FeedbackItem[]
  total: number
  page: number
  limit: number
}

const roadmapStatuses: FeedbackStatus[] = ['PLANNED', 'IN_PROGRESS', 'DONE']

const columns = ref<Record<FeedbackStatus, FeedbackItem[]>>({
  PLANNED: [],
  IN_PROGRESS: [],
  DONE: [],
} as Record<FeedbackStatus, FeedbackItem[]>)

const loading = ref(true)
const error = ref('')

const columnMeta: Record<string, { color: string; icon: string }> = {
  PLANNED: { color: 'text-cosmo-purple', icon: 'lucide:lightbulb' },
  IN_PROGRESS: { color: 'text-cosmo-warning', icon: 'lucide:loader' },
  DONE: { color: 'text-cosmo-success', icon: 'lucide:check-circle' },
}

const columnBorderColor: Record<string, string> = {
  PLANNED: 'border-t-cosmo-purple',
  IN_PROGRESS: 'border-t-cosmo-warning',
  DONE: 'border-t-cosmo-success',
}

async function fetchRoadmap() {
  loading.value = true
  error.value = ''

  try {
    const results = await Promise.all(
      roadmapStatuses.map((status) =>
        $fetch<FeedbackResponse>(`/api/board/${props.slug}/feedback`, {
          query: { status, limit: 50 },
        }),
      ),
    )

    roadmapStatuses.forEach((status, i) => {
      columns.value[status] = results[i].data
    })
  } catch {
    error.value = 'Failed to load roadmap.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchRoadmap)
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center py-16"
    >
      <SharedLoadingSpinner size="lg" />
    </div>

    <div
      v-else-if="error"
      class="text-center py-12 text-cosmo-error"
    >
      {{ error }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div
        v-for="status in roadmapStatuses"
        :key="status"
        class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl overflow-hidden"
      >
        <div
          class="border-t-2 px-5 py-4 flex items-center gap-2"
          :class="columnBorderColor[status]"
        >
          <Icon
            :name="columnMeta[status].icon"
            class="w-5 h-5"
            :class="columnMeta[status].color"
          />
          <h3
            class="font-semibold text-sm"
            :class="columnMeta[status].color"
          >
            {{ STATUS_LABELS[status as FeedbackStatus] }}
          </h3>
          <span class="ml-auto text-cosmo-text-dim text-xs font-medium">
            {{ columns[status].length }}
          </span>
        </div>

        <div class="p-3 space-y-3">
          <template v-if="columns[status].length">
            <BoardFeedbackCard
              v-for="item in columns[status]"
              :key="item.id"
              :feedback="item"
              :slug="slug"
              compact
            />
          </template>
          <p
            v-else
            class="text-center text-cosmo-text-dim text-sm py-8"
          >
            No items yet
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

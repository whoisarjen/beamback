<script setup lang="ts">
import { STATUS_LABELS, type FeedbackStatus } from '~/utils/constants'
import { formatRelativeDate, truncateText } from '~/utils/formatters'

defineProps<{
  feedback: {
    id: string
    title: string
    description?: string | null
    status: FeedbackStatus
    authorName?: string | null
    createdAt: string
    voteCount: number
  }
  slug: string
  compact?: boolean
}>()

function statusBgClass(status: FeedbackStatus): string {
  const map: Record<FeedbackStatus, string> = {
    NEW: 'bg-cosmo-blue/15 text-cosmo-blue',
    PLANNED: 'bg-cosmo-purple/15 text-cosmo-purple',
    IN_PROGRESS: 'bg-cosmo-warning/15 text-cosmo-warning',
    DONE: 'bg-cosmo-success/15 text-cosmo-success',
    CLOSED: 'bg-gray-500/15 text-gray-400',
  }
  return map[status] || 'bg-cosmo-surface text-cosmo-text-muted'
}
</script>

<template>
  <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-4 flex gap-4 items-start transition-colors hover:border-cosmo-border-bright">
    <BoardVoteButton
      :feedback-id="feedback.id"
      :slug="slug"
      :initial-count="feedback.voteCount"
    />

    <div class="flex-1 min-w-0">
      <h3 class="text-cosmo-text font-semibold text-base leading-snug">
        {{ feedback.title }}
      </h3>
      <p
        v-if="feedback.description && !compact"
        class="mt-1 text-cosmo-text-muted text-sm leading-relaxed"
      >
        {{ truncateText(feedback.description, 160) }}
      </p>

      <div class="flex flex-wrap items-center gap-2 mt-2">
        <span
          class="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="statusBgClass(feedback.status)"
        >
          {{ STATUS_LABELS[feedback.status] }}
        </span>
        <span class="text-cosmo-text-dim text-xs">
          {{ feedback.authorName || 'Anonymous' }}
        </span>
        <span class="text-cosmo-text-dim text-xs">&middot;</span>
        <span class="text-cosmo-text-dim text-xs">
          {{ formatRelativeDate(feedback.createdAt) }}
        </span>
      </div>
    </div>
  </div>
</template>

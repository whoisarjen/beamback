<script setup lang="ts">
import { formatNumber } from '~/utils/formatters'
import { STATUS_LABELS } from '~/utils/constants'
import type { FeedbackStatus } from '~/utils/constants'

const props = defineProps<{
  stats: {
    totalFeedback: number
    thisMonthFeedback: number
    byStatus: Record<FeedbackStatus, number>
  }
}>()

const statusBadgeClasses: Record<FeedbackStatus, string> = {
  NEW: 'bg-cosmo-blue/15 text-cosmo-blue',
  PLANNED: 'bg-cosmo-purple/15 text-cosmo-purple',
  IN_PROGRESS: 'bg-cosmo-warning/15 text-cosmo-warning',
  DONE: 'bg-cosmo-success/15 text-cosmo-success',
  CLOSED: 'bg-gray-500/15 text-gray-400',
}
</script>

<template>
  <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-4">
    <div class="flex flex-wrap items-center gap-4 lg:gap-6">
      <!-- Total feedback -->
      <div class="flex items-center gap-2">
        <Icon name="lucide:message-square" class="w-4 h-4 text-cosmo-text-muted" />
        <span class="text-sm text-cosmo-text-muted">Total</span>
        <span class="text-sm font-semibold text-cosmo-text">{{ formatNumber(stats.totalFeedback) }}</span>
      </div>

      <!-- This month -->
      <div class="flex items-center gap-2">
        <Icon name="lucide:calendar" class="w-4 h-4 text-cosmo-text-muted" />
        <span class="text-sm text-cosmo-text-muted">This Month</span>
        <span class="text-sm font-semibold text-cosmo-text">{{ formatNumber(stats.thisMonthFeedback) }}</span>
      </div>

      <!-- Separator -->
      <div class="hidden lg:block w-px h-5 bg-cosmo-border" />

      <!-- Status badges -->
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-for="statusKey in (['NEW', 'PLANNED', 'IN_PROGRESS', 'DONE', 'CLOSED'] as FeedbackStatus[])"
          :key="statusKey"
          :class="[
            'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium',
            statusBadgeClasses[statusKey],
          ]"
        >
          {{ STATUS_LABELS[statusKey] }}
          <span class="font-semibold">{{ stats.byStatus[statusKey] || 0 }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

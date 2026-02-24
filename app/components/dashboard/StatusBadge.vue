<script setup lang="ts">
import { STATUS_LABELS } from '~/utils/constants'
import type { FeedbackStatus } from '~/utils/constants'

const props = defineProps<{
  status: FeedbackStatus
}>()

const badgeClasses: Record<FeedbackStatus, string> = {
  NEW: 'bg-cosmo-blue/15 text-cosmo-blue',
  PLANNED: 'bg-cosmo-purple/15 text-cosmo-purple',
  IN_PROGRESS: 'bg-cosmo-warning/15 text-cosmo-warning',
  DONE: 'bg-cosmo-success/15 text-cosmo-success',
  CLOSED: 'bg-gray-500/15 text-gray-400',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
      badgeClasses[props.status],
    ]"
  >
    {{ STATUS_LABELS[props.status] }}
  </span>
</template>

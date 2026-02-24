<script setup lang="ts">
import { STATUS_LABELS, type FeedbackStatus } from '~/utils/constants'

defineProps<{
  modelValue: string
  statuses: readonly FeedbackStatus[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function label(status: FeedbackStatus): string {
  return STATUS_LABELS[status] || status
}
</script>

<template>
  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
    <button
      class="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
      :class="
        modelValue === ''
          ? 'bg-cosmo-blue text-white'
          : 'bg-cosmo-surface text-cosmo-text-muted hover:bg-cosmo-elevated hover:text-cosmo-text border border-cosmo-border'
      "
      @click="emit('update:modelValue', '')"
    >
      All
    </button>
    <button
      v-for="status in statuses"
      :key="status"
      class="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
      :class="
        modelValue === status
          ? 'bg-cosmo-blue text-white'
          : 'bg-cosmo-surface text-cosmo-text-muted hover:bg-cosmo-elevated hover:text-cosmo-text border border-cosmo-border'
      "
      @click="emit('update:modelValue', status)"
    >
      {{ label(status) }}
    </button>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

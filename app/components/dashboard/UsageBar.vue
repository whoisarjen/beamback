<script setup lang="ts">
const props = defineProps<{
  count: number
  limit: number
  tier: string
}>()

const percentage = computed(() => {
  if (props.limit === Infinity || props.limit === 0) return 0
  return Math.min(100, Math.round((props.count / props.limit) * 100))
})

const barColor = computed(() => {
  if (percentage.value >= 100) return 'bg-cosmo-error'
  if (percentage.value >= 80) return 'bg-cosmo-warning'
  return 'bg-cosmo-success'
})

const isUnlimited = computed(() => props.limit === Infinity || props.limit >= 999999)

const displayLimit = computed(() => {
  return isUnlimited.value ? 'Unlimited' : String(props.limit)
})
</script>

<template>
  <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-4">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm text-cosmo-text-muted">
        Monthly usage
      </span>
      <span class="text-xs font-medium text-cosmo-text-dim uppercase">
        {{ tier }} plan
      </span>
    </div>

    <div class="flex items-baseline gap-1 mb-3">
      <span class="text-lg font-semibold text-cosmo-text">{{ count }}</span>
      <span class="text-sm text-cosmo-text-dim">/</span>
      <span class="text-sm text-cosmo-text-muted">{{ displayLimit }} feedback items this month</span>
    </div>

    <div v-if="!isUnlimited" class="w-full h-2 bg-cosmo-elevated rounded-full overflow-hidden">
      <div
        :class="['h-full rounded-full transition-all duration-500', barColor]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
    <div v-else class="w-full h-2 bg-cosmo-elevated rounded-full overflow-hidden">
      <div class="h-full rounded-full bg-cosmo-success w-1/6" />
    </div>
  </div>
</template>

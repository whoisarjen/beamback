<script setup lang="ts">
const props = defineProps<{
  feedbackId: string
  slug: string
  initialCount: number
  initialVoted?: boolean
}>()

const count = ref(props.initialCount)
const voted = ref(props.initialVoted ?? false)
const loading = ref(false)

async function toggleVote() {
  if (loading.value) return

  loading.value = true

  // Optimistic update
  const prevCount = count.value
  const prevVoted = voted.value
  voted.value = !voted.value
  count.value = voted.value ? count.value + 1 : count.value - 1

  try {
    const result = await $fetch<{ voted: boolean; count: number }>(
      `/api/board/${props.slug}/vote`,
      {
        method: 'POST',
        body: { feedbackId: props.feedbackId },
      },
    )
    count.value = result.count
    voted.value = result.voted
  } catch {
    // Revert on error
    count.value = prevCount
    voted.value = prevVoted
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button
    type="button"
    class="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-14 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
    :class="
      voted
        ? 'bg-cosmo-blue/15 text-cosmo-blue border border-cosmo-blue/30'
        : 'bg-cosmo-surface text-cosmo-text-muted border border-cosmo-border hover:border-cosmo-border-bright hover:text-cosmo-text'
    "
    :aria-label="voted ? 'Remove vote' : 'Vote'"
    :aria-pressed="voted"
    :disabled="loading"
    @click="toggleVote"
  >
    <Icon
      name="lucide:chevron-up"
      class="w-5 h-5"
      :class="voted ? 'text-cosmo-blue' : ''"
    />
    <span class="text-sm font-semibold leading-none">{{ count }}</span>
  </button>
</template>

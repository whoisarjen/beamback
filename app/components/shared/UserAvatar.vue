<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  avatarUrl?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})

const sizeClasses: Record<string, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
}

const initial = computed(() => props.name?.charAt(0).toUpperCase() || '?')

const bgColor = computed(() => {
  const colors = [
    'bg-cosmo-blue',
    'bg-cosmo-purple',
    'bg-cosmo-success',
    'bg-cosmo-warning',
    'bg-cosmo-error',
  ]
  let hash = 0
  for (const char of props.name) {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
})
</script>

<template>
  <div
    :class="[sizeClasses[size], 'rounded-full shrink-0 overflow-hidden']"
    :title="name"
  >
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      :alt="name"
      class="h-full w-full object-cover"
    />
    <div
      v-else
      :class="[bgColor, 'h-full w-full flex items-center justify-center font-medium text-white']"
    >
      {{ initial }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })

const sizeClasses: Record<string, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-3',
}
</script>

<template>
  <div
    :class="[sizeClasses[size], 'rounded-full border-cosmo-blue border-t-transparent animate-spin']"
    role="status"
    aria-label="Loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  div {
    animation: none;
    opacity: 0.6;
  }
}
</style>

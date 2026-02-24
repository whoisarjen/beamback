<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div
      v-if="icon"
      class="w-16 h-16 rounded-2xl bg-cosmo-elevated flex items-center justify-center mb-6"
    >
      <Icon :name="icon" class="w-8 h-8 text-cosmo-text-muted" />
    </div>
    <h3 class="text-lg font-semibold text-cosmo-text mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-cosmo-text-muted max-w-md mb-6">
      {{ description }}
    </p>
    <slot />
  </div>
</template>

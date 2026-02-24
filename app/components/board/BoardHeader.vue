<script setup lang="ts">
defineProps<{
  project: {
    name: string
    description?: string | null
  }
}>()
</script>

<template>
  <header class="text-center py-10 px-4">
    <h1 class="text-3xl md:text-4xl font-bold text-cosmo-text">
      {{ project.name }}
    </h1>
    <p
      v-if="project.description"
      class="mt-3 text-cosmo-text-muted text-lg max-w-2xl mx-auto"
    >
      {{ project.description }}
    </p>
  </header>
</template>

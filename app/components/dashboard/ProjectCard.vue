<script setup lang="ts">
import { formatRelativeDate } from '~/utils/formatters'

const props = defineProps<{
  project: {
    id: string
    name: string
    feedbackCount: number
    unreadCount: number
    websiteUrl: string | null
    createdAt: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="`/dashboard/projects/${project.id}`"
    class="block bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-5 hover:border-cosmo-border-bright transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cosmo-blue group"
  >
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-base font-semibold text-cosmo-text group-hover:text-cosmo-blue-bright transition-colors truncate mr-2">
        {{ project.name }}
      </h3>
      <div class="flex items-center gap-2 shrink-0">
        <span
          v-if="project.unreadCount > 0"
          class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-medium bg-cosmo-error/20 text-cosmo-error rounded-full"
        >
          {{ project.unreadCount }}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-3 mb-4">
      <span class="inline-flex items-center gap-1.5 text-sm text-cosmo-text-muted">
        <Icon name="lucide:message-square" class="w-3.5 h-3.5" />
        {{ project.feedbackCount }} feedback
      </span>
    </div>

    <div class="flex items-center justify-between text-xs text-cosmo-text-dim">
      <span
        v-if="project.websiteUrl"
        class="truncate max-w-[60%]"
        :title="project.websiteUrl"
      >
        <Icon name="lucide:globe" class="w-3 h-3 inline mr-1" />
        {{ project.websiteUrl.replace(/^https?:\/\//, '') }}
      </span>
      <span v-else />
      <span>{{ formatRelativeDate(project.createdAt) }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-cosmo-bg text-cosmo-text flex items-center justify-center">
    <div class="text-center space-y-4">
      <p class="text-6xl font-bold text-cosmo-blue">{{ error.statusCode }}</p>
      <h1 class="text-2xl font-semibold">
        {{ is404 ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="text-cosmo-text-muted max-w-md">
        {{ is404 ? 'The page you are looking for does not exist or has been moved.' : 'An unexpected error occurred. Please try again.' }}
      </p>
      <button
        class="mt-4 px-6 py-2 bg-cosmo-blue text-white rounded-lg hover:bg-cosmo-blue-bright transition-colors"
        @click="handleError"
      >
        {{ is404 ? 'Go home' : 'Try again' }}
      </button>
    </div>
  </div>
</template>

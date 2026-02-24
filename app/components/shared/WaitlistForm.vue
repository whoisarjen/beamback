<script setup lang="ts">
const props = withDefaults(defineProps<{
  source?: string
}>(), {
  source: 'landing',
})

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function handleSubmit() {
  if (!email.value) return

  status.value = 'loading'
  errorMessage.value = ''

  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: {
        email: email.value,
        source: props.source,
      },
    })
    status.value = 'success'
    email.value = ''
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err?.data?.message || 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <div class="w-full">
    <form v-if="status !== 'success'" class="flex gap-2" @submit.prevent="handleSubmit">
      <input
        v-model="email"
        type="email"
        required
        placeholder="you@email.com"
        class="flex-1 min-w-0 px-4 py-2.5 bg-cosmo-surface border border-cosmo-border rounded-lg text-sm text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
        :disabled="status === 'loading'"
      />
      <button
        type="submit"
        :disabled="status === 'loading'"
        class="px-5 py-2.5 bg-cosmo-blue text-white text-sm font-medium rounded-lg hover:bg-cosmo-blue-bright transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cosmo-blue shrink-0"
      >
        <SharedLoadingSpinner v-if="status === 'loading'" size="sm" />
        <span v-else>Join Waitlist</span>
      </button>
    </form>

    <p v-if="status === 'success'" class="text-sm text-cosmo-success flex items-center gap-2">
      <Icon name="lucide:check-circle" class="w-4 h-4" />
      You're on the list! We'll notify you at launch.
    </p>

    <p v-if="status === 'error'" class="mt-2 text-sm text-cosmo-error">
      {{ errorMessage }}
    </p>
  </div>
</template>

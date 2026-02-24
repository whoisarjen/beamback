<script setup lang="ts">
const props = defineProps<{
  slug: string
}>()

const emit = defineEmits<{
  submitted: []
}>()

const title = ref('')
const description = ref('')
const authorName = ref('')
const authorEmail = ref('')
const honeypot = ref('')

const loading = ref(false)
const success = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!title.value.trim()) return

  loading.value = true
  error.value = ''

  try {
    await $fetch(`/api/board/${props.slug}/feedback`, {
      method: 'POST',
      body: {
        title: title.value.trim(),
        description: description.value.trim() || undefined,
        authorName: authorName.value.trim() || undefined,
        authorEmail: authorEmail.value.trim() || undefined,
        website: honeypot.value || undefined,
      },
    })

    success.value = true
    title.value = ''
    description.value = ''
    authorName.value = ''
    authorEmail.value = ''
    honeypot.value = ''

    emit('submitted')

    setTimeout(() => {
      success.value = false
    }, 4000)
  } catch (err: unknown) {
    const fetchError = err as { data?: { message?: string } }
    error.value = fetchError?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-5 md:p-6">
    <h2 class="text-lg font-semibold text-cosmo-text mb-4">
      Submit Feedback
    </h2>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      mode="out-in"
    >
      <div
        v-if="success"
        class="flex flex-col items-center justify-center py-8 gap-3"
      >
        <div class="w-12 h-12 rounded-full bg-cosmo-success/15 flex items-center justify-center">
          <Icon name="lucide:check" class="w-6 h-6 text-cosmo-success" />
        </div>
        <p class="text-cosmo-text font-semibold text-lg">Thank you!</p>
        <p class="text-cosmo-text-muted text-sm">Your feedback has been submitted.</p>
      </div>

      <form
        v-else
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <!-- Honeypot -->
        <input
          name="website"
          v-model="honeypot"
          class="hidden"
          tabindex="-1"
          autocomplete="off"
        />

        <div>
          <label for="feedback-title" class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
            Title <span class="text-cosmo-error">*</span>
          </label>
          <input
            id="feedback-title"
            v-model="title"
            type="text"
            required
            maxlength="200"
            placeholder="What's your feedback?"
            class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
          />
        </div>

        <div>
          <label for="feedback-description" class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
            Description
          </label>
          <textarea
            id="feedback-description"
            v-model="description"
            rows="3"
            maxlength="5000"
            placeholder="Add more details (optional)"
            class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue resize-y"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="feedback-name" class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
              Name
            </label>
            <input
              id="feedback-name"
              v-model="authorName"
              type="text"
              maxlength="100"
              placeholder="Your name (optional)"
              class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            />
          </div>

          <div>
            <label for="feedback-email" class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
              Email
            </label>
            <input
              id="feedback-email"
              v-model="authorEmail"
              type="email"
              placeholder="Your email (optional)"
              class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            />
            <p class="mt-1 text-xs text-cosmo-text-dim">
              Only visible to the project owner
            </p>
          </div>
        </div>

        <div
          v-if="error"
          class="rounded-lg bg-cosmo-error/10 border border-cosmo-error/20 px-4 py-3 text-sm text-cosmo-error"
          role="alert"
        >
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading || !title.trim()"
          class="bg-cosmo-blue text-white rounded-lg px-4 py-2 hover:bg-cosmo-blue-bright transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:ring-offset-2 focus:ring-offset-cosmo-bg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <LoadingSpinner v-if="loading" size="sm" />
          {{ loading ? 'Submitting...' : 'Submit Feedback' }}
        </button>
      </form>
    </Transition>
  </div>
</template>

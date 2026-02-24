<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

const route = useRoute()
const apiKey = computed(() => route.params.apiKey as string)

// Widget config
interface WidgetConfig {
  name: string
  widgetColor: string | null
  widgetPosition: string | null
  widgetButtonText: string | null
}

const config = ref<WidgetConfig | null>(null)
const configError = ref(false)
const configLoading = ref(true)

// Form state
const title = ref('')
const description = ref('')
const authorEmail = ref('')
const honeypot = ref('')

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

// Focus management
const titleInput = ref<HTMLInputElement | null>(null)

const accentColor = computed(() => config.value?.widgetColor || '#3A82FF')

async function loadConfig() {
  configLoading.value = true
  try {
    const data = await $fetch<WidgetConfig>(`/api/widget/${apiKey.value}`)
    config.value = data
  } catch {
    configError.value = true
  } finally {
    configLoading.value = false
  }
}

async function handleSubmit() {
  if (!title.value.trim() || submitting.value) return

  submitting.value = true
  submitError.value = ''

  try {
    await $fetch(`/api/widget/${apiKey.value}/submit`, {
      method: 'POST',
      body: {
        title: title.value.trim(),
        description: description.value.trim() || undefined,
        authorEmail: authorEmail.value.trim() || undefined,
        website: honeypot.value || undefined,
      },
    })
    submitted.value = true
    title.value = ''
    description.value = ''
    authorEmail.value = ''
    honeypot.value = ''
  } catch (err: unknown) {
    const fetchError = err as { data?: { message?: string } }
    submitError.value = fetchError?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

function closeWidget() {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage('feedback-widget-close', '*')
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeWidget()
  }
}

onMounted(async () => {
  await loadConfig()
  document.addEventListener('keydown', handleKeydown)
  nextTick(() => {
    titleInput.value?.focus()
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="min-h-screen bg-cosmo-bg text-cosmo-text font-sans p-4 relative">
    <!-- Close button -->
    <button
      type="button"
      class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
      aria-label="Close feedback form"
      @click="closeWidget"
    >
      <Icon name="lucide:x" class="w-4 h-4" />
    </button>

    <!-- Loading state -->
    <div v-if="configLoading" class="space-y-4 pt-8 animate-pulse">
      <div class="h-5 w-32 bg-cosmo-elevated rounded" />
      <div class="h-10 bg-cosmo-elevated rounded-lg" />
      <div class="h-20 bg-cosmo-elevated rounded-lg" />
      <div class="h-10 bg-cosmo-elevated rounded-lg" />
      <div class="h-10 w-28 bg-cosmo-elevated rounded-lg" />
    </div>

    <!-- Error: invalid API key -->
    <div
      v-else-if="configError"
      class="flex flex-col items-center justify-center min-h-[300px] text-center px-4"
    >
      <div class="w-12 h-12 rounded-full bg-cosmo-error/15 flex items-center justify-center mb-4">
        <Icon name="lucide:alert-triangle" class="w-6 h-6 text-cosmo-error" />
      </div>
      <p class="text-cosmo-text font-medium">This feedback widget is not configured correctly</p>
      <p class="text-cosmo-text-dim text-sm mt-1">Please contact the site administrator.</p>
    </div>

    <!-- Success state -->
    <div
      v-else-if="submitted"
      class="flex flex-col items-center justify-center min-h-[300px] text-center px-4 gap-4"
    >
      <div class="w-14 h-14 rounded-full bg-cosmo-success/15 flex items-center justify-center">
        <Icon name="lucide:check" class="w-7 h-7 text-cosmo-success" />
      </div>
      <div>
        <p class="text-cosmo-text font-semibold text-lg">Thank you!</p>
        <p class="text-cosmo-text-muted text-sm mt-1">Your feedback has been submitted.</p>
      </div>
      <button
        type="button"
        class="rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cosmo-bg"
        :style="{ backgroundColor: accentColor }"
        @click="closeWidget"
      >
        Close
      </button>
    </div>

    <!-- Form -->
    <form
      v-else-if="config"
      class="space-y-4 pt-6"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-base font-semibold text-cosmo-text pr-6">
        Send us feedback
      </h2>

      <!-- Honeypot -->
      <input
        name="website"
        v-model="honeypot"
        class="hidden"
        tabindex="-1"
        autocomplete="off"
      />

      <div>
        <label for="widget-title" class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
          Title <span class="text-cosmo-error">*</span>
        </label>
        <input
          id="widget-title"
          ref="titleInput"
          v-model="title"
          type="text"
          required
          maxlength="200"
          placeholder="What's on your mind?"
          class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue text-sm"
        />
      </div>

      <div>
        <label for="widget-description" class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
          Description
        </label>
        <textarea
          id="widget-description"
          v-model="description"
          rows="3"
          maxlength="5000"
          placeholder="Tell us more (optional)"
          class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue resize-none text-sm"
        />
      </div>

      <div>
        <label for="widget-email" class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
          Email
        </label>
        <input
          id="widget-email"
          v-model="authorEmail"
          type="email"
          placeholder="your@email.com (optional)"
          class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue text-sm"
        />
      </div>

      <div
        v-if="submitError"
        class="rounded-lg bg-cosmo-error/10 border border-cosmo-error/20 px-3 py-2 text-sm text-cosmo-error"
        role="alert"
      >
        {{ submitError }}
      </div>

      <button
        type="submit"
        :disabled="submitting || !title.trim()"
        class="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cosmo-bg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        :style="{ backgroundColor: accentColor }"
      >
        <LoadingSpinner v-if="submitting" size="sm" />
        {{ submitting ? 'Sending...' : 'Send Feedback' }}
      </button>

      <p class="text-center text-cosmo-text-dim text-xs">
        Powered by
        <a
          href="https://beamback.whoisarjen.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cosmo-blue hover:text-cosmo-blue-bright"
        >
          Beamback
        </a>
      </p>
    </form>
  </div>
</template>

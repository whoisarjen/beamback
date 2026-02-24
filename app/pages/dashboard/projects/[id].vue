<script setup lang="ts">
import type { FeedbackStatus } from '~/utils/constants'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const config = useRuntimeConfig()
const projectId = route.params.id as string

const { data: project, pending, error, refresh } = useFetch(`/api/projects/${projectId}`)
const { data: usage, refresh: refreshUsage } = useFetch(`/api/projects/${projectId}/usage`)

const activeTab = ref<'feedback' | 'settings'>('feedback')

useHead({
  title: computed(() => project.value?.name ? `${project.value.name} — Beamback` : 'Project — Beamback'),
})

// Settings form state
const settingsForm = reactive({
  name: '',
  description: '',
  websiteUrl: '',
  isPublic: true,
  widgetColor: '#3A82FF',
  widgetPosition: 'bottom-right',
  widgetButtonText: 'Feedback',
})
const settingsLoading = ref(false)
const settingsError = ref('')
const settingsSuccess = ref(false)
const deleteConfirmName = ref('')
const showDeleteConfirm = ref(false)
const deleteLoading = ref(false)
const deleteError = ref('')
const rotateLoading = ref(false)
const rotateSuccess = ref(false)

// Sync form when project data loads
watch(project, (p) => {
  if (p) {
    settingsForm.name = p.name
    settingsForm.description = p.description || ''
    settingsForm.websiteUrl = p.websiteUrl || ''
    settingsForm.isPublic = p.isPublic
    settingsForm.widgetColor = p.widgetColor || '#3A82FF'
    settingsForm.widgetPosition = p.widgetPosition || 'bottom-right'
    settingsForm.widgetButtonText = p.widgetButtonText || 'Feedback'
  }
}, { immediate: true })

const { updateProject, deleteProject } = useProjects()

async function saveSettings() {
  settingsLoading.value = true
  settingsError.value = ''
  settingsSuccess.value = false
  try {
    await updateProject(projectId, {
      name: settingsForm.name,
      description: settingsForm.description || undefined,
      websiteUrl: settingsForm.websiteUrl || undefined,
      isPublic: settingsForm.isPublic,
      widgetColor: settingsForm.widgetColor,
      widgetPosition: settingsForm.widgetPosition,
      widgetButtonText: settingsForm.widgetButtonText,
    })
    settingsSuccess.value = true
    refresh()
    setTimeout(() => { settingsSuccess.value = false }, 3000)
  } catch (e: any) {
    settingsError.value = e?.data?.message || 'Failed to save settings'
  } finally {
    settingsLoading.value = false
  }
}

async function handleDelete() {
  if (deleteConfirmName.value !== project.value?.name) return
  deleteLoading.value = true
  deleteError.value = ''
  try {
    await deleteProject(projectId, deleteConfirmName.value)
    navigateTo('/dashboard')
  } catch (e: any) {
    deleteError.value = e?.data?.message || 'Failed to delete project'
  } finally {
    deleteLoading.value = false
  }
}

async function handleRotateKey() {
  rotateLoading.value = true
  rotateSuccess.value = false
  try {
    await $fetch(`/api/projects/${projectId}/rotate-key`, { method: 'POST' })
    rotateSuccess.value = true
    refresh()
    setTimeout(() => { rotateSuccess.value = false }, 3000)
  } catch {
    // ignore
  } finally {
    rotateLoading.value = false
  }
}

const boardUrl = computed(() => {
  if (!project.value) return ''
  const base = config.public.appUrl || 'https://beamback.whoisarjen.com'
  return `${base}/board/${project.value.slug}`
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
    <!-- Loading -->
    <div v-if="pending && !project" class="space-y-4">
      <div class="h-8 bg-cosmo-elevated rounded w-1/3 animate-pulse" />
      <div class="h-40 bg-glass-bg border border-glass-border rounded-2xl animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-16">
      <Icon name="lucide:alert-circle" class="w-12 h-12 text-cosmo-error mx-auto mb-4" />
      <h2 class="text-lg font-semibold text-cosmo-text mb-2">Project not found</h2>
      <NuxtLink
        to="/dashboard"
        class="text-sm text-cosmo-blue hover:text-cosmo-blue-bright transition-colors"
      >
        Back to dashboard
      </NuxtLink>
    </div>

    <!-- Project loaded -->
    <template v-else-if="project">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <NuxtLink
              to="/dashboard"
              class="p-1 rounded-md text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            >
              <Icon name="lucide:arrow-left" class="w-4 h-4" />
            </NuxtLink>
            <h1 class="text-2xl font-bold text-cosmo-text">{{ project.name }}</h1>
          </div>
          <p v-if="project.description" class="text-sm text-cosmo-text-muted ml-8">
            {{ project.description }}
          </p>
        </div>
        <div class="flex items-center gap-2 ml-8 sm:ml-0">
          <a
            :href="boardUrl"
            target="_blank"
            class="flex items-center gap-2 px-3 py-2 text-sm text-cosmo-text-muted border border-cosmo-border rounded-lg hover:text-cosmo-text hover:border-cosmo-border-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
          >
            <Icon name="lucide:external-link" class="w-4 h-4" />
            View Board
          </a>
        </div>
      </div>

      <!-- Stats and Usage -->
      <div v-if="project.stats" class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div class="lg:col-span-2">
          <DashboardStatsBar :stats="project.stats" />
        </div>
        <DashboardUsageBar
          v-if="usage"
          :count="usage.currentMonthFeedback"
          :limit="usage.monthlyLimit"
          :tier="usage.tier"
        />
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-1 border-b border-cosmo-border mb-6">
        <button
          :class="[
            'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus:outline-none',
            activeTab === 'feedback'
              ? 'text-cosmo-blue border-cosmo-blue'
              : 'text-cosmo-text-muted border-transparent hover:text-cosmo-text',
          ]"
          @click="activeTab = 'feedback'"
        >
          <span class="flex items-center gap-2">
            <Icon name="lucide:inbox" class="w-4 h-4" />
            Feedback
          </span>
        </button>
        <button
          :class="[
            'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus:outline-none',
            activeTab === 'settings'
              ? 'text-cosmo-blue border-cosmo-blue'
              : 'text-cosmo-text-muted border-transparent hover:text-cosmo-text',
          ]"
          @click="activeTab = 'settings'"
        >
          <span class="flex items-center gap-2">
            <Icon name="lucide:settings" class="w-4 h-4" />
            Settings
          </span>
        </button>
      </div>

      <!-- Feedback tab -->
      <DashboardFeedbackTable
        v-if="activeTab === 'feedback'"
        :project-id="projectId"
      />

      <!-- Settings tab -->
      <div v-else-if="activeTab === 'settings'" class="space-y-6">
        <!-- General settings -->
        <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6">
          <h3 class="text-base font-semibold text-cosmo-text mb-4">General</h3>

          <div v-if="settingsError" class="mb-4 p-3 bg-cosmo-error/10 border border-cosmo-error/20 rounded-lg text-sm text-cosmo-error">
            {{ settingsError }}
          </div>

          <div v-if="settingsSuccess" class="mb-4 p-3 bg-cosmo-success/10 border border-cosmo-success/20 rounded-lg text-sm text-cosmo-success flex items-center gap-2">
            <Icon name="lucide:check-circle" class="w-4 h-4" />
            Settings saved successfully
          </div>

          <form class="space-y-4" @submit.prevent="saveSettings">
            <div>
              <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">Project name</label>
              <input
                v-model="settingsForm.name"
                type="text"
                required
                minlength="2"
                maxlength="50"
                class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">Description</label>
              <textarea
                v-model="settingsForm.description"
                rows="2"
                maxlength="500"
                placeholder="A brief description of your project"
                class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue resize-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">Website URL</label>
              <input
                v-model="settingsForm.websiteUrl"
                type="url"
                placeholder="https://myapp.com"
                class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
              />
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                :class="[
                  'relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue',
                  settingsForm.isPublic ? 'bg-cosmo-blue' : 'bg-cosmo-elevated',
                ]"
                @click="settingsForm.isPublic = !settingsForm.isPublic"
              >
                <span
                  :class="[
                    'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform',
                    settingsForm.isPublic ? 'translate-x-5' : 'translate-x-0',
                  ]"
                />
              </button>
              <span class="text-sm text-cosmo-text-muted">Public board (anyone can view and submit feedback)</span>
            </div>
            <div class="pt-2">
              <button
                type="submit"
                :disabled="settingsLoading"
                class="bg-cosmo-blue text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-cosmo-blue-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue disabled:opacity-50"
              >
                <SharedLoadingSpinner v-if="settingsLoading" size="sm" class="inline mr-2" />
                Save Settings
              </button>
            </div>
          </form>
        </div>

        <!-- Widget settings -->
        <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6">
          <h3 class="text-base font-semibold text-cosmo-text mb-4">Widget</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">Widget Color</label>
              <div class="flex items-center gap-3">
                <input
                  v-model="settingsForm.widgetColor"
                  type="color"
                  class="w-10 h-10 rounded-lg cursor-pointer border border-cosmo-border bg-transparent"
                />
                <input
                  v-model="settingsForm.widgetColor"
                  type="text"
                  pattern="^#[0-9a-fA-F]{6}$"
                  class="w-32 bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-sm text-cosmo-text font-mono focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">Button Position</label>
              <select
                v-model="settingsForm.widgetPosition"
                class="bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-sm text-cosmo-text focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">Button Text</label>
              <input
                v-model="settingsForm.widgetButtonText"
                type="text"
                maxlength="30"
                class="w-full max-w-xs bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-sm text-cosmo-text focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
              />
            </div>
          </div>
        </div>

        <!-- Embed code -->
        <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6">
          <h3 class="text-base font-semibold text-cosmo-text mb-2">Embed Code</h3>
          <p class="text-sm text-cosmo-text-muted mb-4">Add this snippet to your website to show the feedback widget.</p>
          <DashboardWidgetCodeSnippet
            :api-key="project.apiKey"
            :app-url="config.public.appUrl"
          />
        </div>

        <!-- API Key -->
        <div class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6">
          <h3 class="text-base font-semibold text-cosmo-text mb-2">API Key</h3>
          <p class="text-sm text-cosmo-text-muted mb-4">Used to identify your project in the widget.</p>
          <div class="flex items-center gap-3">
            <code class="bg-cosmo-bg border border-cosmo-border rounded-lg px-3 py-2 text-sm text-cosmo-text-muted font-mono flex-1 truncate">
              {{ project.apiKey }}
            </code>
            <button
              :disabled="rotateLoading"
              class="shrink-0 flex items-center gap-2 px-3 py-2 text-sm text-cosmo-warning border border-cosmo-warning/30 rounded-lg hover:bg-cosmo-warning/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-warning disabled:opacity-50"
              @click="handleRotateKey"
            >
              <Icon name="lucide:refresh-cw" class="w-4 h-4" :class="{ 'animate-spin': rotateLoading }" />
              Rotate
            </button>
          </div>
          <p v-if="rotateSuccess" class="mt-2 text-xs text-cosmo-success">API key rotated. Update your widget code.</p>
        </div>

        <!-- Danger zone -->
        <div class="bg-glass-bg backdrop-blur-xl border border-cosmo-error/20 rounded-2xl p-6">
          <h3 class="text-base font-semibold text-cosmo-error mb-2">Danger Zone</h3>
          <p class="text-sm text-cosmo-text-muted mb-4">
            Permanently delete this project and all its feedback. This action cannot be undone.
          </p>
          <button
            v-if="!showDeleteConfirm"
            class="px-4 py-2 text-sm font-medium text-cosmo-error border border-cosmo-error/30 rounded-lg hover:bg-cosmo-error/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-error"
            @click="showDeleteConfirm = true"
          >
            Delete Project
          </button>
          <div v-else class="space-y-3">
            <div v-if="deleteError" class="p-3 bg-cosmo-error/10 border border-cosmo-error/20 rounded-lg text-sm text-cosmo-error">
              {{ deleteError }}
            </div>
            <p class="text-sm text-cosmo-text-muted">
              Type <strong class="text-cosmo-text">{{ project.name }}</strong> to confirm:
            </p>
            <input
              v-model="deleteConfirmName"
              type="text"
              :placeholder="project.name"
              class="w-full max-w-xs bg-cosmo-surface border border-cosmo-error/30 rounded-lg px-3 py-2 text-sm text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-error"
            />
            <div class="flex items-center gap-3">
              <button
                :disabled="deleteConfirmName !== project.name || deleteLoading"
                class="px-4 py-2 text-sm font-medium text-white bg-cosmo-error rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-error disabled:opacity-50 disabled:cursor-not-allowed"
                @click="handleDelete"
              >
                <SharedLoadingSpinner v-if="deleteLoading" size="sm" class="inline mr-2" />
                Permanently Delete
              </button>
              <button
                class="px-4 py-2 text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue rounded-lg"
                @click="showDeleteConfirm = false; deleteConfirmName = ''"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

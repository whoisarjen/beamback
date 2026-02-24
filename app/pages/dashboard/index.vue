<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const config = useRuntimeConfig()
const { projects, loading, fetchProjects, createProject } = useProjects()

const showCreateForm = ref(false)
const createdProject = ref<any>(null)
const createLoading = ref(false)
const createError = ref('')

const form = reactive({
  name: '',
  websiteUrl: '',
})

const hasProjects = computed(() => projects.value.length > 0)

async function handleCreate() {
  if (!form.name.trim()) return

  createLoading.value = true
  createError.value = ''

  try {
    const data: { name: string; websiteUrl?: string } = { name: form.name.trim() }
    if (form.websiteUrl.trim()) {
      data.websiteUrl = form.websiteUrl.trim()
    }
    const project = await createProject(data)
    createdProject.value = project
    form.name = ''
    form.websiteUrl = ''
  } catch (e: any) {
    createError.value = e?.data?.message || 'Failed to create project'
  } finally {
    createLoading.value = false
  }
}

function dismissSuccess() {
  createdProject.value = null
}

onMounted(() => {
  if (projects.value.length === 0) {
    fetchProjects()
  }
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-cosmo-text">Projects</h1>
        <p class="text-sm text-cosmo-text-muted mt-1">Manage your feedback projects</p>
      </div>
      <button
        v-if="hasProjects"
        class="bg-cosmo-blue text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-cosmo-blue-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue flex items-center gap-2"
        @click="showCreateForm = !showCreateForm"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Project
      </button>
    </div>

    <!-- Success card after creation -->
    <Transition name="slide">
      <div
        v-if="createdProject"
        class="bg-glass-bg backdrop-blur-xl border border-cosmo-success/30 rounded-2xl p-6 mb-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-cosmo-success/15 flex items-center justify-center">
              <Icon name="lucide:check-circle" class="w-5 h-5 text-cosmo-success" />
            </div>
            <div>
              <h3 class="text-base font-semibold text-cosmo-text">
                "{{ createdProject.name }}" created!
              </h3>
              <p class="text-sm text-cosmo-text-muted">Add this snippet to your website to start collecting feedback</p>
            </div>
          </div>
          <button
            class="p-1.5 rounded-md text-cosmo-text-dim hover:text-cosmo-text hover:bg-cosmo-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            @click="dismissSuccess"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>
        <DashboardWidgetCodeSnippet :api-key="createdProject.apiKey" />
        <div class="mt-4 flex justify-end">
          <NuxtLink
            :to="`/dashboard/projects/${createdProject.id}`"
            class="text-sm text-cosmo-blue hover:text-cosmo-blue-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue rounded"
          >
            Go to project &rarr;
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Inline create form (shown when clicking "New Project" or when empty) -->
    <Transition name="slide">
      <div
        v-if="showCreateForm || !hasProjects"
        class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6 mb-6"
      >
        <h3 v-if="!hasProjects" class="text-lg font-semibold text-cosmo-text mb-1">
          Create your first project
        </h3>
        <p v-if="!hasProjects" class="text-sm text-cosmo-text-muted mb-5">
          Projects let you collect and manage feedback for different apps or websites.
        </p>

        <div v-if="createError" class="mb-4 p-3 bg-cosmo-error/10 border border-cosmo-error/20 rounded-lg text-sm text-cosmo-error">
          {{ createError }}
        </div>

        <form class="space-y-4" @submit.prevent="handleCreate">
          <div>
            <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
              Project name <span class="text-cosmo-error">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="My awesome app"
              required
              minlength="2"
              maxlength="50"
              class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:border-cosmo-blue"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-cosmo-text-muted mb-1.5">
              Website URL
              <span class="text-cosmo-text-dim font-normal">(optional)</span>
            </label>
            <input
              v-model="form.websiteUrl"
              type="url"
              placeholder="https://myapp.com"
              class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:border-cosmo-blue"
            />
          </div>
          <div class="flex items-center gap-3">
            <button
              type="submit"
              :disabled="createLoading || !form.name.trim()"
              class="bg-cosmo-blue text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-cosmo-blue-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <LoadingSpinner v-if="createLoading" size="sm" />
              <Icon v-else name="lucide:plus" class="w-4 h-4" />
              Create Project
            </button>
            <button
              v-if="hasProjects"
              type="button"
              class="px-4 py-2 text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue rounded-lg"
              @click="showCreateForm = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Transition>

    <!-- Loading state -->
    <div v-if="loading && projects.length === 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="i in 4"
        :key="i"
        class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-5 animate-pulse"
      >
        <div class="h-5 bg-cosmo-elevated rounded w-1/2 mb-3" />
        <div class="h-4 bg-cosmo-elevated rounded w-1/3 mb-4" />
        <div class="h-3 bg-cosmo-elevated rounded w-2/3" />
      </div>
    </div>

    <!-- Empty state (no projects, form is above) -->
    <DashboardEmptyState
      v-else-if="!loading && !hasProjects && !createdProject"
      title="No projects yet"
      description="Create a project above to start collecting feedback from your users."
      icon="lucide:rocket"
    />

    <!-- Project grid -->
    <div v-else-if="hasProjects" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DashboardProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

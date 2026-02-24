<script setup lang="ts">
const { user, clear: logout } = useUserSession()
const { projects, fetchProjects } = useProjects()
const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(false)

onMounted(() => {
  fetchProjects()
})

const activeProjectId = computed(() => {
  const id = route.params.id as string | undefined
  return id || null
})

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await logout()
  navigateTo('/')
}

function closeSidebar() {
  sidebarOpen.value = false
}

watch(route, () => {
  sidebarOpen.value = false
})
</script>

<template>
  <div class="min-h-screen bg-cosmo-bg text-cosmo-text flex">
    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        @click="closeSidebar"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:sticky top-0 left-0 z-50 h-screen w-65 flex flex-col',
        'bg-cosmo-surface border-r border-cosmo-border',
        'transition-transform duration-300 ease-in-out',
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 py-5 border-b border-cosmo-border">
        <AppLogo :size="28" />
        <span class="text-lg font-semibold text-cosmo-text">Beamback</span>
      </div>

      <!-- Projects section -->
      <div class="flex-1 overflow-y-auto px-3 py-4">
        <div class="flex items-center justify-between px-2 mb-2">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-cosmo-text-dim">
            Projects
          </h3>
          <NuxtLink
            to="/dashboard"
            class="p-1 rounded-md text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            title="All projects"
          >
            <Icon name="lucide:layout-grid" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <nav class="space-y-0.5">
          <NuxtLink
            v-for="project in projects"
            :key="project.id"
            :to="`/dashboard/projects/${project.id}`"
            :class="[
              'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-cosmo-blue',
              activeProjectId === project.id
                ? 'bg-cosmo-elevated text-cosmo-text'
                : 'text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-elevated/50',
            ]"
          >
            <span class="truncate">{{ project.name }}</span>
            <span
              v-if="project.unreadCount > 0"
              class="shrink-0 ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-medium bg-cosmo-error/20 text-cosmo-error rounded-full"
            >
              {{ project.unreadCount }}
            </span>
          </NuxtLink>

          <div
            v-if="projects.length === 0"
            class="px-3 py-4 text-center text-sm text-cosmo-text-dim"
          >
            No projects yet
          </div>
        </nav>
      </div>

      <!-- User section -->
      <div class="border-t border-cosmo-border px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="shrink-0">
            <img
              v-if="user?.avatarUrl"
              :src="user.avatarUrl"
              :alt="user.name || 'User'"
              class="w-8 h-8 rounded-full"
            />
            <div
              v-else
              class="w-8 h-8 rounded-full bg-cosmo-elevated flex items-center justify-center text-cosmo-text-muted text-sm font-medium"
            >
              {{ (user?.name || user?.email || 'U').charAt(0).toUpperCase() }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-cosmo-text truncate">
              {{ user?.name || user?.email || 'User' }}
            </p>
          </div>
          <button
            class="p-1.5 rounded-md text-cosmo-text-muted hover:text-cosmo-error hover:bg-cosmo-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            title="Log out"
            @click="handleLogout"
          >
            <Icon name="lucide:log-out" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Mobile header -->
      <header class="lg:hidden sticky top-0 z-30 bg-cosmo-surface/80 backdrop-blur-xl border-b border-cosmo-border px-4 py-3">
        <div class="flex items-center gap-3">
          <button
            class="p-2 -ml-2 rounded-lg text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            @click="sidebarOpen = true"
          >
            <Icon name="lucide:menu" class="w-5 h-5" />
          </button>
          <AppLogo :size="24" />
          <span class="font-semibold text-cosmo-text">Beamback</span>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

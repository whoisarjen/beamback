<script setup lang="ts">
import { FEEDBACK_STATUSES, STATUS_LABELS } from '~/utils/constants'
import type { FeedbackStatus } from '~/utils/constants'
import { formatRelativeDate } from '~/utils/formatters'

const props = defineProps<{
  projectId: string
}>()

const { feedback, total, page, limit, loading, fetchFeedback, updateFeedback, deleteFeedback } = useFeedback()

const activeFilter = ref<FeedbackStatus | 'ALL'>('ALL')
const searchQuery = ref('')
const expandedId = ref<string | null>(null)
const editingNote = ref('')
const editingStatus = ref<FeedbackStatus>('NEW')
const deleteConfirmId = ref<string | null>(null)
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const totalPages = computed(() => Math.ceil(total.value / limit.value))

function loadFeedback() {
  fetchFeedback({
    projectId: props.projectId,
    status: activeFilter.value === 'ALL' ? undefined : activeFilter.value,
    search: searchQuery.value || undefined,
    page: page.value,
    limit: limit.value,
  })
}

watch([activeFilter], () => {
  page.value = 1
  loadFeedback()
})

watch(searchQuery, () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    page.value = 1
    loadFeedback()
  }, 300)
})

onMounted(() => {
  loadFeedback()
})

function toggleExpand(item: any) {
  if (expandedId.value === item.id) {
    expandedId.value = null
  } else {
    expandedId.value = item.id
    editingNote.value = item.adminNote || ''
    editingStatus.value = item.status
  }
}

async function toggleRead(item: any) {
  await updateFeedback(item.id, { isRead: !item.isRead })
}

async function saveChanges(item: any) {
  await updateFeedback(item.id, {
    status: editingStatus.value,
    adminNote: editingNote.value || undefined,
  })
  expandedId.value = null
}

async function handleDelete(id: string) {
  await deleteFeedback(id)
  deleteConfirmId.value = null
  expandedId.value = null
}

function goToPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  loadFeedback()
}

const filterPills = computed(() => {
  return [
    { key: 'ALL' as const, label: 'All' },
    ...FEEDBACK_STATUSES.map((s) => ({ key: s, label: STATUS_LABELS[s] })),
  ]
})
</script>

<template>
  <div>
    <!-- Filters and search -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <!-- Status filter pills -->
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="pill in filterPills"
          :key="pill.key"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue',
            activeFilter === pill.key
              ? 'bg-cosmo-blue text-white'
              : 'bg-cosmo-elevated text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-border',
          ]"
          @click="activeFilter = pill.key"
        >
          {{ pill.label }}
        </button>
      </div>

      <!-- Search input -->
      <div class="relative sm:ml-auto sm:w-64">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmo-text-dim" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search feedback..."
          class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg pl-9 pr-3 py-2 text-sm text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:border-cosmo-blue"
        />
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading && feedback.length === 0" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-4 animate-pulse"
      >
        <div class="flex items-center gap-3">
          <div class="w-5 h-5 bg-cosmo-elevated rounded" />
          <div class="flex-1">
            <div class="h-4 bg-cosmo-elevated rounded w-2/3 mb-2" />
            <div class="h-3 bg-cosmo-elevated rounded w-1/4" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <DashboardEmptyState
      v-else-if="!loading && feedback.length === 0 && activeFilter === 'ALL' && !searchQuery"
      title="No feedback yet"
      description="Feedback will appear here once users start submitting through your widget or public board."
      icon="lucide:inbox"
    />

    <DashboardEmptyState
      v-else-if="!loading && feedback.length === 0"
      title="No matching feedback"
      description="Try adjusting your filters or search query."
      icon="lucide:search-x"
    />

    <!-- Feedback list -->
    <div v-else class="space-y-2">
      <div
        v-for="item in feedback"
        :key="item.id"
        class="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl overflow-hidden transition-colors"
        :class="{ 'border-cosmo-border-bright': expandedId === item.id }"
      >
        <!-- Row -->
        <div
          class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-cosmo-elevated/30 transition-colors"
          @click="toggleExpand(item)"
        >
          <!-- Read checkbox -->
          <button
            class="shrink-0 w-5 h-5 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            :class="item.isRead ? 'bg-cosmo-blue border-cosmo-blue' : 'border-cosmo-border-bright hover:border-cosmo-blue'"
            :title="item.isRead ? 'Mark as unread' : 'Mark as read'"
            @click.stop="toggleRead(item)"
          >
            <Icon v-if="item.isRead" name="lucide:check" class="w-3.5 h-3.5 text-white mx-auto" />
          </button>

          <!-- Title -->
          <div class="flex-1 min-w-0">
            <p
              class="text-sm truncate"
              :class="item.isRead ? 'text-cosmo-text-muted' : 'text-cosmo-text font-medium'"
            >
              {{ item.title }}
            </p>
          </div>

          <!-- Status badge -->
          <DashboardStatusBadge :status="item.status" class="hidden sm:inline-flex" />

          <!-- Votes -->
          <span class="hidden sm:flex items-center gap-1 text-xs text-cosmo-text-muted shrink-0">
            <Icon name="lucide:arrow-up" class="w-3.5 h-3.5" />
            {{ item.voteCount }}
          </span>

          <!-- Author -->
          <span class="hidden md:block text-xs text-cosmo-text-dim truncate max-w-24 shrink-0">
            {{ item.authorName || item.authorEmail || 'Anonymous' }}
          </span>

          <!-- Date -->
          <span class="hidden sm:block text-xs text-cosmo-text-dim shrink-0">
            {{ formatRelativeDate(item.createdAt) }}
          </span>

          <!-- Expand indicator -->
          <Icon
            name="lucide:chevron-down"
            class="w-4 h-4 text-cosmo-text-dim transition-transform shrink-0"
            :class="{ 'rotate-180': expandedId === item.id }"
          />
        </div>

        <!-- Expanded detail -->
        <Transition name="expand">
          <div v-if="expandedId === item.id" class="border-t border-cosmo-border px-4 py-4">
            <!-- Mobile-only status & meta -->
            <div class="sm:hidden flex items-center gap-3 mb-3">
              <DashboardStatusBadge :status="item.status" />
              <span class="flex items-center gap-1 text-xs text-cosmo-text-muted">
                <Icon name="lucide:arrow-up" class="w-3.5 h-3.5" />
                {{ item.voteCount }} votes
              </span>
              <span class="text-xs text-cosmo-text-dim">
                {{ formatRelativeDate(item.createdAt) }}
              </span>
            </div>

            <!-- Description -->
            <div v-if="item.description" class="mb-4">
              <p class="text-sm text-cosmo-text-muted whitespace-pre-wrap">{{ item.description }}</p>
            </div>
            <div v-else class="mb-4">
              <p class="text-sm text-cosmo-text-dim italic">No description provided</p>
            </div>

            <!-- Author info -->
            <div class="flex items-center gap-2 mb-4 text-xs text-cosmo-text-dim">
              <Icon name="lucide:user" class="w-3.5 h-3.5" />
              <span>{{ item.authorName || 'Anonymous' }}</span>
              <span v-if="item.authorEmail" class="text-cosmo-text-dim">
                ({{ item.authorEmail }})
              </span>
            </div>

            <!-- Admin controls -->
            <div class="space-y-3 pt-3 border-t border-cosmo-border">
              <!-- Status select -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-xs font-medium text-cosmo-text-muted">Status</label>
                <select
                  v-model="editingStatus"
                  class="bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-1.5 text-sm text-cosmo-text focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:border-cosmo-blue"
                >
                  <option v-for="s in FEEDBACK_STATUSES" :key="s" :value="s">
                    {{ STATUS_LABELS[s] }}
                  </option>
                </select>
              </div>

              <!-- Admin note -->
              <div>
                <label class="text-xs font-medium text-cosmo-text-muted block mb-1">Admin Note</label>
                <textarea
                  v-model="editingNote"
                  rows="2"
                  placeholder="Add an internal note..."
                  class="w-full bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 text-sm text-cosmo-text placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue focus:border-cosmo-blue resize-none"
                />
              </div>

              <!-- Action buttons -->
              <div class="flex items-center justify-between">
                <button
                  v-if="deleteConfirmId !== item.id"
                  class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cosmo-error hover:bg-cosmo-error/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-error"
                  @click="deleteConfirmId = item.id"
                >
                  <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                  Delete
                </button>
                <div v-else class="flex items-center gap-2">
                  <span class="text-xs text-cosmo-error">Are you sure?</span>
                  <button
                    class="px-2 py-1 text-xs font-medium text-cosmo-error bg-cosmo-error/10 hover:bg-cosmo-error/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-error"
                    @click="handleDelete(item.id)"
                  >
                    Yes, delete
                  </button>
                  <button
                    class="px-2 py-1 text-xs text-cosmo-text-muted hover:text-cosmo-text rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
                    @click="deleteConfirmId = null"
                  >
                    Cancel
                  </button>
                </div>

                <button
                  class="bg-cosmo-blue text-white rounded-lg px-4 py-1.5 text-xs font-medium hover:bg-cosmo-blue-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
                  @click="saveChanges(item)"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex items-center justify-between mt-4 pt-4 border-t border-cosmo-border"
    >
      <p class="text-xs text-cosmo-text-dim">
        Showing {{ (page - 1) * limit + 1 }}-{{ Math.min(page * limit, total) }} of {{ total }}
      </p>
      <div class="flex items-center gap-2">
        <button
          :disabled="page <= 1"
          class="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue disabled:opacity-40 disabled:cursor-not-allowed"
          :class="page <= 1 ? 'text-cosmo-text-dim' : 'text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-elevated'"
          @click="goToPage(page - 1)"
        >
          <Icon name="lucide:chevron-left" class="w-4 h-4" />
          Previous
        </button>
        <span class="text-xs text-cosmo-text-muted">
          {{ page }} / {{ totalPages }}
        </span>
        <button
          :disabled="page >= totalPages"
          class="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue disabled:opacity-40 disabled:cursor-not-allowed"
          :class="page >= totalPages ? 'text-cosmo-text-dim' : 'text-cosmo-text-muted hover:text-cosmo-text hover:bg-cosmo-elevated'"
          @click="goToPage(page + 1)"
        >
          Next
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 600px;
}
</style>

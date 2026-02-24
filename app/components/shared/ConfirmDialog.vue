<script setup lang="ts">
const props = withDefaults(defineProps<{
  open: boolean
  title: string
  message: string
  confirmText?: string
  confirmInput?: string
}>(), {
  confirmText: 'Confirm',
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const inputValue = ref('')

const canConfirm = computed(() => {
  if (!props.confirmInput) return true
  return inputValue.value === props.confirmInput
})

watch(() => props.open, (isOpen) => {
  if (!isOpen) inputValue.value = ''
})

function onConfirm() {
  if (canConfirm.value) {
    emit('confirm')
  }
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('cancel')
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('cancel')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @click="onBackdropClick"
        @keydown="onKeydown"
      >
        <div class="w-full max-w-md bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6 space-y-4">
          <h2 class="text-lg font-semibold text-cosmo-text">{{ title }}</h2>
          <p class="text-sm text-cosmo-text-muted">{{ message }}</p>

          <div v-if="confirmInput" class="space-y-2">
            <label class="block text-sm text-cosmo-text-muted">
              Type <span class="font-mono text-cosmo-text bg-cosmo-elevated px-1.5 py-0.5 rounded">{{ confirmInput }}</span> to confirm
            </label>
            <input
              v-model="inputValue"
              type="text"
              class="w-full px-3 py-2 bg-cosmo-surface border border-cosmo-border rounded-lg text-cosmo-text text-sm placeholder:text-cosmo-text-dim focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
              :placeholder="confirmInput"
            />
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              class="px-4 py-2 text-sm text-cosmo-text-muted hover:text-cosmo-text rounded-lg border border-cosmo-border hover:border-cosmo-border-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
              @click="emit('cancel')"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="!canConfirm"
              class="px-4 py-2 text-sm text-white bg-cosmo-error rounded-lg hover:bg-cosmo-error/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cosmo-error"
              @click="onConfirm"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dialog-enter-active,
  .dialog-leave-active {
    transition: none;
  }
}
</style>

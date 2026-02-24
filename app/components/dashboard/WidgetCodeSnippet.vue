<script setup lang="ts">
const props = defineProps<{
  apiKey: string
}>()

const config = useRuntimeConfig()
const copied = ref(false)

const snippetCode = computed(() => {
  const baseUrl = config.public.appUrl || 'https://beamback.whoisarjen.com'
  return `<script src="${baseUrl}/widget.js" data-api-key="${props.apiKey}" defer><\/script>`
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(snippetCode.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = snippetCode.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="relative">
    <div class="bg-cosmo-bg border border-cosmo-border rounded-xl p-4 font-mono text-sm text-cosmo-text-muted overflow-x-auto">
      <code class="break-all whitespace-pre-wrap">{{ snippetCode }}</code>
    </div>
    <button
      class="absolute top-3 right-3 p-2 rounded-lg bg-cosmo-elevated hover:bg-cosmo-border text-cosmo-text-muted hover:text-cosmo-text transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
      :title="copied ? 'Copied!' : 'Copy to clipboard'"
      @click="copyToClipboard"
    >
      <Icon v-if="copied" name="lucide:check" class="w-4 h-4 text-cosmo-success" />
      <Icon v-else name="lucide:copy" class="w-4 h-4" />
    </button>
  </div>
</template>

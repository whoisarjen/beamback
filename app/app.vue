<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
const isWidget = computed(() => route.path.startsWith('/widget'))
const showWidget = computed(() => !isDashboard.value && !isWidget.value && !!config.public.widgetApiKey)

useHead({
  script: computed(() =>
    showWidget.value
      ? [{ src: `${config.public.appUrl}/widget.js`, 'data-api-key': config.public.widgetApiKey, defer: true }]
      : []
  ),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
const isWidget = computed(() => route.path.startsWith('/widget'))
const showWidget = computed(() => !isDashboard.value && !isWidget.value)

useHead({
  script: computed(() =>
    showWidget.value
      ? [{ src: 'https://beamback.whoisarjen.com/widget.js', 'data-api-key': 'ak_l2_2KGeUWBGZmuLnUBGfq', defer: true }]
      : []
  ),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

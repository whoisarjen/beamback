<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 32 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="beam-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#8B5CF6" />
        <stop offset="100%" stop-color="#3A82FF" />
      </linearGradient>
      <linearGradient id="beam-light" x1="32" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#5A9AFF" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0" />
      </linearGradient>
    </defs>
    <!-- Prism body -->
    <polygon points="32,6 54,52 10,52" fill="url(#beam-gradient)" />
    <!-- Light beam refracting out -->
    <polygon points="42,36 62,56 62,44" fill="url(#beam-light)" />
    <polygon points="42,36 58,38 62,44" fill="#5A9AFF" opacity="0.3" />
    <!-- Prism edge highlight -->
    <line x1="32" y1="6" x2="10" y2="52" stroke="#E2E8F0" stroke-width="0.5" opacity="0.2" />
  </svg>
</template>

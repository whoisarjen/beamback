<template>
  <div class="min-h-screen bg-cosmo-bg text-cosmo-text font-sans">
    <slot />
    <footer class="py-6 text-center text-cosmo-text-dim text-sm">
      Powered by <NuxtLink to="/" class="text-cosmo-blue hover:text-cosmo-blue-bright transition-colors">Beamback</NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      scrolled
        ? 'bg-cosmo-bg/80 backdrop-blur-xl border-b border-cosmo-border shadow-lg shadow-black/20'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <SharedAppLogo :size="26" />
          <span class="text-base font-semibold text-cosmo-text tracking-tight">Beamback</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">Features</a>
          <a href="#pricing" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">Pricing</a>
          <a href="https://github.com/whoisarjen/beamback" target="_blank" rel="noopener noreferrer" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">GitHub</a>
          <NuxtLink to="/login" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">Sign in</NuxtLink>
          <NuxtLink
            to="/login"
            class="px-4 py-2 text-sm font-medium text-white bg-cosmo-blue rounded-lg hover:bg-cosmo-blue-bright transition-all hover:shadow-lg hover:shadow-cosmo-blue/20 focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
          >
            Start free
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="md:hidden p-2 text-cosmo-text-muted hover:text-cosmo-text focus:outline-none focus:ring-2 focus:ring-cosmo-blue rounded-lg"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon v-if="!mobileMenuOpen" name="lucide:menu" class="w-5 h-5" />
          <Icon v-else name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-cosmo-border bg-cosmo-bg/95 backdrop-blur-xl">
        <div class="px-5 py-5 space-y-1">
          <a href="#features" class="block text-sm text-cosmo-text-muted hover:text-cosmo-text py-2.5" @click="mobileMenuOpen = false">Features</a>
          <a href="#pricing" class="block text-sm text-cosmo-text-muted hover:text-cosmo-text py-2.5" @click="mobileMenuOpen = false">Pricing</a>
          <a href="https://github.com/whoisarjen/beamback" target="_blank" rel="noopener noreferrer" class="block text-sm text-cosmo-text-muted hover:text-cosmo-text py-2.5" @click="mobileMenuOpen = false">GitHub</a>
          <NuxtLink to="/login" class="block text-sm text-cosmo-text-muted hover:text-cosmo-text py-2.5" @click="mobileMenuOpen = false">Sign in</NuxtLink>
          <NuxtLink
            to="/login"
            class="block w-full text-center px-4 py-3 mt-3 text-sm font-medium text-white bg-cosmo-blue rounded-lg hover:bg-cosmo-blue-bright transition-colors focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            @click="mobileMenuOpen = false"
          >
            Start free
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active { transition: none; }
}
</style>

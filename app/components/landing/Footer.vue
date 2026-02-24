<template>
  <footer class="relative border-t border-cosmo-border">
    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <div class="py-12 sm:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          <!-- Brand column -->
          <div class="sm:col-span-1">
            <NuxtLink to="/" class="flex items-center gap-2.5 mb-4">
              <SharedAppLogo :size="24" />
              <span class="text-base font-semibold text-cosmo-text tracking-tight">Beamback</span>
            </NuxtLink>
            <p class="text-sm text-cosmo-text-muted leading-relaxed max-w-xs">
              Open-source feedback collection for MVPs and indie products. Built with Nuxt, Prisma, and Tailwind.
            </p>
          </div>

          <!-- Product links -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-cosmo-text-dim mb-4">Product</h4>
            <ul class="space-y-2.5">
              <li>
                <a href="#features" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">Features</a>
              </li>
              <li>
                <a href="#pricing" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">Pricing</a>
              </li>
              <li>
                <NuxtLink to="/login" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">Sign in</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-cosmo-text-dim mb-4">Resources</h4>
            <ul class="space-y-2.5">
              <li>
                <a href="https://github.com/whoisarjen/beamback" target="_blank" rel="noopener noreferrer" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">GitHub</a>
              </li>
              <li>
                <NuxtLink to="/privacy" class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors">Privacy Policy</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-cosmo-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-cosmo-text-dim">
          &copy; {{ new Date().getFullYear() }} Beamback. MIT License.
        </p>
        <p class="text-xs text-cosmo-text-dim">
          Built by <a href="https://whoisarjen.com" target="_blank" rel="noopener noreferrer" class="text-cosmo-text-muted hover:text-cosmo-text transition-colors">Arjen</a>
        </p>
      </div>
    </div>
  </footer>
</template>

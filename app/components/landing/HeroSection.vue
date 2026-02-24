<template>
  <section class="relative pt-36 pb-24 sm:pt-44 sm:pb-32 px-5">
    <div class="max-w-4xl mx-auto">
      <!-- Badge -->
      <div class="flex justify-center mb-10 hero-fade" style="animation-delay: 0s">
        <div class="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 text-xs font-medium text-cosmo-text-muted bg-cosmo-surface/80 border border-cosmo-border rounded-full">
          <span class="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-cosmo-blue/15 text-cosmo-blue rounded-full">Open Source</span>
          Free forever for side projects
        </div>
      </div>

      <!-- Headline -->
      <h1 class="text-center hero-fade" style="animation-delay: 0.1s">
        <span class="block text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-cosmo-text">
          Stop building
        </span>
        <span class="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-display italic bg-linear-to-r from-cosmo-purple via-cosmo-blue-bright to-cosmo-blue bg-clip-text text-transparent">
          feedback forms
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="mt-8 text-center text-lg sm:text-xl text-cosmo-text-muted max-w-xl mx-auto leading-relaxed hero-fade" style="animation-delay: 0.2s">
        One script tag gives your MVP a feedback widget, public voting board, and roadmap. Set up in 2 minutes. Focus on shipping.
      </p>

      <!-- CTA row -->
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 hero-fade" style="animation-delay: 0.3s">
        <NuxtLink
          to="/login"
          class="group relative px-8 py-3.5 text-base font-medium text-white bg-cosmo-blue rounded-xl hover:bg-cosmo-blue-bright transition-all shadow-xl shadow-cosmo-blue/20 hover:shadow-cosmo-blue/30 focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
        >
          Start collecting feedback
          <span class="ml-2 inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </NuxtLink>
        <a
          href="https://github.com/whoisarjen/beamback"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-6 py-3.5 text-base font-medium text-cosmo-text-muted hover:text-cosmo-text border border-cosmo-border hover:border-cosmo-border-bright rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
        >
          <Icon name="lucide:github" class="w-5 h-5" />
          View on GitHub
        </a>
      </div>

      <!-- Mock dashboard preview -->
      <div class="mt-20 hero-fade" style="animation-delay: 0.45s">
        <div class="relative">
          <!-- Glow behind the card -->
          <div class="absolute -inset-4 bg-linear-to-b from-cosmo-purple/10 via-cosmo-blue/5 to-transparent rounded-3xl blur-2xl" />

          <div class="relative bg-cosmo-surface border border-cosmo-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            <!-- Title bar -->
            <div class="flex items-center gap-2 px-4 py-3 border-b border-cosmo-border bg-cosmo-bg/50">
              <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-cosmo-text-dim/30" />
                <div class="w-2.5 h-2.5 rounded-full bg-cosmo-text-dim/30" />
                <div class="w-2.5 h-2.5 rounded-full bg-cosmo-text-dim/30" />
              </div>
              <div class="flex-1 flex justify-center">
                <div class="px-12 py-1 bg-cosmo-elevated rounded-md text-[11px] text-cosmo-text-dim">
                  beamback.whoisarjen.com/dashboard
                </div>
              </div>
              <div class="w-12" />
            </div>

            <!-- Dashboard mock -->
            <div class="p-5 sm:p-6">
              <!-- Stats row -->
              <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
                <div class="bg-cosmo-elevated/60 rounded-xl p-3 sm:p-4 border border-cosmo-border/50">
                  <p class="text-[11px] text-cosmo-text-dim uppercase tracking-wider">Feedback</p>
                  <p class="text-xl sm:text-2xl font-bold text-cosmo-text mt-1">142</p>
                  <p class="text-[11px] text-cosmo-success mt-0.5">+18% this week</p>
                </div>
                <div class="bg-cosmo-elevated/60 rounded-xl p-3 sm:p-4 border border-cosmo-border/50">
                  <p class="text-[11px] text-cosmo-text-dim uppercase tracking-wider">Votes</p>
                  <p class="text-xl sm:text-2xl font-bold text-cosmo-text mt-1">1.2k</p>
                  <p class="text-[11px] text-cosmo-blue mt-0.5">89 active voters</p>
                </div>
                <div class="bg-cosmo-elevated/60 rounded-xl p-3 sm:p-4 border border-cosmo-border/50">
                  <p class="text-[11px] text-cosmo-text-dim uppercase tracking-wider">Shipped</p>
                  <p class="text-xl sm:text-2xl font-bold text-cosmo-text mt-1">24</p>
                  <p class="text-[11px] text-cosmo-purple mt-0.5">6 in progress</p>
                </div>
              </div>

              <!-- Feedback items -->
              <div class="space-y-2">
                <div class="flex items-center gap-3 bg-cosmo-bg/40 rounded-lg p-3 border border-cosmo-border/30">
                  <div class="flex flex-col items-center min-w-8">
                    <Icon name="lucide:chevron-up" class="w-3.5 h-3.5 text-cosmo-blue" />
                    <span class="text-xs font-semibold text-cosmo-text">47</span>
                  </div>
                  <span class="text-sm text-cosmo-text truncate flex-1">Add dark mode toggle to settings</span>
                  <span class="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full bg-cosmo-warning/12 text-cosmo-warning border border-cosmo-warning/15">In Progress</span>
                </div>
                <div class="flex items-center gap-3 bg-cosmo-bg/40 rounded-lg p-3 border border-cosmo-border/30">
                  <div class="flex flex-col items-center min-w-8">
                    <Icon name="lucide:chevron-up" class="w-3.5 h-3.5 text-cosmo-text-dim" />
                    <span class="text-xs font-semibold text-cosmo-text">31</span>
                  </div>
                  <span class="text-sm text-cosmo-text truncate flex-1">Export data to CSV for reporting</span>
                  <span class="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full bg-cosmo-purple/12 text-cosmo-purple border border-cosmo-purple/15">Planned</span>
                </div>
                <div class="flex items-center gap-3 bg-cosmo-bg/40 rounded-lg p-3 border border-cosmo-border/30">
                  <div class="flex flex-col items-center min-w-8">
                    <Icon name="lucide:chevron-up" class="w-3.5 h-3.5 text-cosmo-text-dim" />
                    <span class="text-xs font-semibold text-cosmo-text">18</span>
                  </div>
                  <span class="text-sm text-cosmo-text truncate flex-1">Keyboard shortcuts for power users</span>
                  <span class="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full bg-cosmo-blue/12 text-cosmo-blue border border-cosmo-blue/15">New</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-fade {
  animation: heroFadeIn 0.7s ease-out both;
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-fade {
    animation: none;
  }
}
</style>

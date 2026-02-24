<template>
  <section class="relative pt-36 pb-24 sm:pt-44 sm:pb-32 px-5">
    <div class="max-w-5xl mx-auto">
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
          Ship features, not
        </span>
        <span class="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-display italic bg-linear-to-r from-cosmo-purple via-cosmo-blue-bright to-cosmo-blue bg-clip-text text-transparent">
          feedback forms
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="mt-8 text-center text-lg sm:text-xl text-cosmo-text-muted max-w-2xl mx-auto leading-relaxed hero-fade" style="animation-delay: 0.2s">
        One script tag. A beautiful widget appears on your site. Users submit ideas, vote on features, and track your roadmap. Set up in 2 minutes.
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

      <!-- Browser mockup with widget demo -->
      <div class="mt-20 hero-fade" style="animation-delay: 0.45s">
        <div class="relative">
          <!-- Glow behind the card -->
          <div class="absolute -inset-6 bg-linear-to-b from-cosmo-purple/12 via-cosmo-blue/8 to-transparent rounded-3xl blur-3xl" />

          <div class="relative bg-cosmo-surface border border-cosmo-border rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <!-- Browser chrome -->
            <div class="flex items-center gap-2 px-4 py-3 border-b border-cosmo-border bg-cosmo-bg/60">
              <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/70" />
                <div class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/70" />
                <div class="w-2.5 h-2.5 rounded-full bg-[#28C840]/70" />
              </div>
              <div class="flex-1 flex justify-center">
                <div class="flex items-center gap-2 px-4 py-1 bg-cosmo-elevated rounded-md text-[11px] text-cosmo-text-dim">
                  <Icon name="lucide:lock" class="w-3 h-3 text-cosmo-success/70" />
                  yourapp.com
                </div>
              </div>
              <div class="w-12" />
            </div>

            <!-- Website content area with widget -->
            <div class="relative min-h-105 sm:min-h-120 bg-cosmo-bg/40">
              <!-- Simulated website content -->
              <div class="p-6 sm:p-10">
                <!-- Fake site nav -->
                <div class="flex items-center justify-between mb-10">
                  <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg bg-linear-to-br from-indigo-400 to-violet-500" />
                    <div class="w-20 h-3 rounded-full bg-cosmo-elevated" />
                  </div>
                  <div class="hidden sm:flex items-center gap-5">
                    <div class="w-12 h-2.5 rounded-full bg-cosmo-elevated/80" />
                    <div class="w-14 h-2.5 rounded-full bg-cosmo-elevated/80" />
                    <div class="w-10 h-2.5 rounded-full bg-cosmo-elevated/80" />
                    <div class="w-16 h-7 rounded-md bg-indigo-500/20" />
                  </div>
                </div>

                <!-- Fake hero content -->
                <div class="max-w-md">
                  <div class="w-48 h-4 rounded-full bg-cosmo-elevated mb-3" />
                  <div class="w-72 h-6 rounded-full bg-cosmo-elevated/80 mb-2" />
                  <div class="w-56 h-6 rounded-full bg-cosmo-elevated/60 mb-6" />
                  <div class="w-64 h-3 rounded-full bg-cosmo-elevated/40 mb-2" />
                  <div class="w-52 h-3 rounded-full bg-cosmo-elevated/40 mb-6" />
                  <div class="flex gap-3">
                    <div class="w-28 h-9 rounded-lg bg-indigo-500/20" />
                    <div class="w-24 h-9 rounded-lg bg-cosmo-elevated/50" />
                  </div>
                </div>

                <!-- Fake card grid -->
                <div class="hidden sm:grid grid-cols-3 gap-4 mt-10">
                  <div class="h-24 rounded-xl bg-cosmo-elevated/30 border border-cosmo-border/30" />
                  <div class="h-24 rounded-xl bg-cosmo-elevated/30 border border-cosmo-border/30" />
                  <div class="h-24 rounded-xl bg-cosmo-elevated/30 border border-cosmo-border/30" />
                </div>
              </div>

              <!-- Beamback widget - positioned bottom-right -->
              <div class="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 flex flex-col items-end gap-3">
                <!-- Widget panel (open state) -->
                <div class="widget-panel w-70 sm:w-80 bg-cosmo-surface border border-cosmo-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
                  <!-- Widget header -->
                  <div class="px-5 pt-5 pb-3">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="text-sm font-semibold text-cosmo-text">Share feedback</h4>
                      <button class="p-1 text-cosmo-text-dim hover:text-cosmo-text-muted">
                        <Icon name="lucide:x" class="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p class="text-[11px] text-cosmo-text-dim">Help us build what matters to you</p>
                  </div>

                  <!-- Category pills -->
                  <div class="px-5 pb-3">
                    <div class="flex gap-1.5">
                      <span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-cosmo-blue/15 text-cosmo-blue border border-cosmo-blue/20">Feature</span>
                      <span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-cosmo-elevated text-cosmo-text-muted border border-cosmo-border/60">Bug</span>
                      <span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-cosmo-elevated text-cosmo-text-muted border border-cosmo-border/60">Idea</span>
                    </div>
                  </div>

                  <!-- Fake filled form -->
                  <div class="px-5 pb-4 space-y-3">
                    <div>
                      <div class="w-full bg-cosmo-bg border border-cosmo-border/60 rounded-lg px-3 py-2">
                        <span class="text-xs text-cosmo-text">Add Slack integration for notifications</span>
                      </div>
                    </div>
                    <div>
                      <div class="w-full bg-cosmo-bg border border-cosmo-border/60 rounded-lg px-3 py-2 min-h-15">
                        <span class="text-xs text-cosmo-text-muted">It would be great to get notified in Slack when new feedback...</span>
                      </div>
                    </div>
                  </div>

                  <!-- Submit -->
                  <div class="px-5 pb-5">
                    <div class="w-full py-2 text-center text-xs font-medium text-white bg-cosmo-blue rounded-lg shadow-lg shadow-cosmo-blue/20">
                      Submit feedback
                    </div>
                  </div>

                  <!-- Powered by -->
                  <div class="px-5 py-2.5 border-t border-cosmo-border/60 bg-cosmo-bg/30">
                    <p class="text-[10px] text-cosmo-text-dim text-center">
                      Powered by <span class="text-cosmo-text-muted font-medium">Beamback</span>
                    </p>
                  </div>
                </div>

                <!-- Widget trigger button -->
                <div class="w-12 h-12 rounded-full bg-cosmo-blue flex items-center justify-center shadow-xl shadow-cosmo-blue/30 ring-4 ring-cosmo-blue/10">
                  <Icon name="lucide:message-square-plus" class="w-5 h-5 text-white" />
                </div>
              </div>

              <!-- Annotation arrow pointing to widget -->
              <div class="absolute bottom-28 right-85 sm:right-95 hidden lg:flex items-center gap-2">
                <span class="text-xs font-medium text-cosmo-blue-bright whitespace-nowrap font-display italic">Your widget, on your site</span>
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" class="text-cosmo-blue-bright/60">
                  <path d="M0 12 C10 12 20 4 32 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-dasharray="3 3" />
                  <path d="M28 1 L33 4 L28 7" stroke="currentColor" stroke-width="1.5" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social proof / trust line -->
      <div class="mt-10 flex flex-col items-center gap-3 hero-fade" style="animation-delay: 0.55s">
        <div class="flex items-center gap-4 text-xs text-cosmo-text-dim">
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:zap" class="w-3.5 h-3.5 text-cosmo-warning" />
            Under 3KB
          </span>
          <span class="w-px h-3 bg-cosmo-border" />
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:clock" class="w-3.5 h-3.5 text-cosmo-success" />
            2-minute setup
          </span>
          <span class="w-px h-3 bg-cosmo-border" />
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:shield" class="w-3.5 h-3.5 text-cosmo-purple" />
            GDPR-friendly
          </span>
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

.widget-panel {
  animation: widgetSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both;
}

@keyframes widgetSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-fade {
    animation: none;
  }
  .widget-panel {
    animation: none;
  }
}
</style>

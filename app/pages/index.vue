<script setup lang="ts">
useHead({
  title: 'Beamback — Ship Features, Not Feedback Forms',
  meta: [
    { name: 'description', content: 'Open-source feedback widget for your MVP. One script tag gives you a widget, public voting board, and roadmap. Set up in 2 minutes.' },
    { property: 'og:title', content: 'Beamback — Ship Features, Not Feedback Forms' },
    { property: 'og:description', content: 'Open-source feedback widget for your MVP. One script tag gives you a widget, public voting board, and roadmap. Set up in 2 minutes.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Beamback — Ship Features, Not Feedback Forms' },
    { name: 'twitter:description', content: 'Open-source feedback widget for your MVP. One script tag gives you a widget, public voting board, and roadmap. Set up in 2 minutes.' },
  ],
  script: [
    {
      src: 'https://beamback.whoisarjen.com/widget.js',
      'data-api-key': 'ak_l2_2KGeUWBGZmuLnUBGfq',
      defer: true,
    },
  ],
})
</script>

<template>
  <div class="relative">
    <LandingCosmicBackground />
    <LandingNavbar />
    <main>
      <LandingHeroSection />
      <LandingFeatureGrid />
      <LandingPricingSection />

      <!-- Final CTA -->
      <section class="relative py-24 sm:py-32 px-5">
        <!-- Subtle glow -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-96 h-96 bg-cosmo-blue/5 rounded-full blur-3xl" />
        </div>

        <div class="relative max-w-2xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmo-text leading-tight">
            Your users have opinions.<br />
            <span class="font-display italic bg-linear-to-r from-cosmo-purple to-cosmo-blue-bright bg-clip-text text-transparent">Give them a voice.</span>
          </h2>
          <p class="mt-6 text-lg text-cosmo-text-muted max-w-lg mx-auto">
            2-minute setup. No credit card. No vendor lock-in. Just real feedback from real users.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink
              to="/login"
              class="group inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-cosmo-blue rounded-xl hover:bg-cosmo-blue-bright transition-all shadow-xl shadow-cosmo-blue/20 hover:shadow-cosmo-blue/30 focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            >
              Start collecting feedback
              <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </NuxtLink>
            <a
              href="https://github.com/whoisarjen/beamback"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-6 py-4 text-base font-medium text-cosmo-text-muted hover:text-cosmo-text border border-cosmo-border hover:border-cosmo-border-bright rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            >
              <Icon name="lucide:github" class="w-5 h-5" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
    <LandingFooter />
  </div>
</template>

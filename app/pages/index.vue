<script setup lang="ts">
useHead({
  title: 'Beamback — Stop Building Feedback Forms',
  meta: [
    { name: 'description', content: 'Open-source feedback collection for your MVP. One script tag gives you a widget, public voting board, and roadmap. Set up in 2 minutes.' },
    { property: 'og:title', content: 'Beamback — Stop Building Feedback Forms' },
    { property: 'og:description', content: 'Open-source feedback collection for your MVP. One script tag gives you a widget, public voting board, and roadmap. Set up in 2 minutes.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Beamback — Stop Building Feedback Forms' },
    { name: 'twitter:description', content: 'Open-source feedback collection for your MVP. One script tag gives you a widget, public voting board, and roadmap. Set up in 2 minutes.' },
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
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-cosmo-text leading-tight">
            Your users have opinions.<br />
            <span class="font-display italic text-cosmo-blue-bright">Give them a place to share.</span>
          </h2>
          <p class="mt-5 text-lg text-cosmo-text-muted">
            Set up takes 2 minutes. No credit card. No vendor lock-in. Just feedback.
          </p>
          <div class="mt-8">
            <NuxtLink
              to="/login"
              class="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-cosmo-blue rounded-xl hover:bg-cosmo-blue-bright transition-all shadow-xl shadow-cosmo-blue/20 hover:shadow-cosmo-blue/30 focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
            >
              Start collecting feedback
              <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
    <LandingFooter />
  </div>
</template>

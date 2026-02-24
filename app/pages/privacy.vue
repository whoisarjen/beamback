<script setup lang="ts">
useHead({
  title: 'Privacy Policy — Beamback',
  meta: [
    { name: 'description', content: 'Beamback privacy policy. How we handle your data.' },
  ],
})
</script>

<template>
  <div class="relative min-h-screen">
    <LandingCosmicBackground />

    <!-- Navbar -->
    <nav class="relative z-10 border-b border-cosmo-border">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <NuxtLink to="/" class="flex items-center gap-2.5 w-fit">
          <SharedAppLogo :size="24" />
          <span class="text-sm font-semibold text-cosmo-text">Beamback</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Content -->
    <main class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 class="text-3xl font-bold text-cosmo-text mb-2">Privacy Policy</h1>
      <p class="text-sm text-cosmo-text-dim mb-12">Last updated: February 2025</p>

      <div class="space-y-10">
        <!-- Data Collection -->
        <section>
          <h2 class="text-xl font-semibold text-cosmo-text mb-3">Data We Collect</h2>
          <p class="text-cosmo-text-muted leading-relaxed">
            We collect only what is necessary to provide the service:
          </p>
          <ul class="mt-3 space-y-2 text-cosmo-text-muted">
            <li class="flex items-start gap-2">
              <span class="text-cosmo-blue mt-1.5 shrink-0">&#8226;</span>
              <span><strong class="text-cosmo-text">Email address</strong> — used for account authentication and essential communications.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cosmo-blue mt-1.5 shrink-0">&#8226;</span>
              <span><strong class="text-cosmo-text">Feedback text</strong> — the content submitted through your feedback widgets.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cosmo-blue mt-1.5 shrink-0">&#8226;</span>
              <span><strong class="text-cosmo-text">Hashed IP addresses</strong> — used solely for rate limiting and spam prevention. We never store raw IPs.</span>
            </li>
          </ul>
        </section>

        <!-- Data Usage -->
        <section>
          <h2 class="text-xl font-semibold text-cosmo-text mb-3">How We Use Your Data</h2>
          <p class="text-cosmo-text-muted leading-relaxed">
            Your data is used exclusively to provide and improve the Beamback service. We do not sell, share,
            or monetize your data in any way. We do not use your data for advertising or tracking purposes.
          </p>
        </section>

        <!-- Data Deletion -->
        <section>
          <h2 class="text-xl font-semibold text-cosmo-text mb-3">Data Deletion</h2>
          <p class="text-cosmo-text-muted leading-relaxed">
            Deleting your account removes all associated data, including your projects, feedback entries,
            and any personal information. This action is permanent and cannot be undone.
          </p>
        </section>

        <!-- Cookies -->
        <section>
          <h2 class="text-xl font-semibold text-cosmo-text mb-3">Cookies</h2>
          <p class="text-cosmo-text-muted leading-relaxed">
            Beamback uses a single session cookie to keep you signed in. We do not use
            tracking cookies, analytics cookies, or any third-party cookies.
          </p>
        </section>

        <!-- Contact -->
        <section>
          <h2 class="text-xl font-semibold text-cosmo-text mb-3">Contact</h2>
          <p class="text-cosmo-text-muted leading-relaxed">
            If you have questions about this privacy policy or your data, please reach out via
            the contact information on our GitHub repository.
          </p>
        </section>
      </div>

      <!-- Back to home -->
      <div class="mt-16 pt-8 border-t border-cosmo-border">
        <NuxtLink
          to="/"
          class="text-sm text-cosmo-text-muted hover:text-cosmo-text transition-colors"
        >
          &larr; Back to home
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

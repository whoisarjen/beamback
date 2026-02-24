<template>
  <section id="pricing" class="relative py-24 sm:py-32 px-5">
    <div class="max-w-5xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16">
        <p class="text-sm font-medium text-cosmo-blue uppercase tracking-wider mb-3">Pricing</p>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmo-text">
          Free to start.
          <span class="font-display italic text-cosmo-text-muted">Scales with you.</span>
        </h2>
        <p class="mt-5 text-lg text-cosmo-text-muted max-w-xl mx-auto">
          The free tier isn't a trial. It's a real plan that covers most side projects and early-stage MVPs.
        </p>
      </div>

      <!-- Pricing cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
        <!-- Launch (Free) -->
        <div class="bg-cosmo-surface border border-cosmo-border rounded-2xl p-8 flex flex-col">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-cosmo-text">Launch</h3>
            <span class="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cosmo-success bg-cosmo-success/10 rounded-full">Free forever</span>
          </div>

          <div class="flex items-baseline gap-1 mb-2">
            <span class="text-5xl font-bold text-cosmo-text tracking-tight">$0</span>
          </div>
          <p class="text-sm text-cosmo-text-dim mb-8">No credit card required</p>

          <ul class="space-y-3.5 flex-1">
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-success shrink-0 mt-0.5" />
              <span><strong class="text-cosmo-text font-medium">2 projects</strong> with full features</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-success shrink-0 mt-0.5" />
              <span><strong class="text-cosmo-text font-medium">50 feedback</strong> per month</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-success shrink-0 mt-0.5" />
              Embeddable widget
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-success shrink-0 mt-0.5" />
              Public board & voting
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-success shrink-0 mt-0.5" />
              Spam protection
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-success shrink-0 mt-0.5" />
              Public roadmap
            </li>
          </ul>

          <NuxtLink
            to="/login"
            class="mt-8 block w-full text-center px-6 py-3.5 text-sm font-medium text-white bg-cosmo-blue rounded-xl hover:bg-cosmo-blue-bright transition-all hover:shadow-lg hover:shadow-cosmo-blue/20 focus:outline-none focus:ring-2 focus:ring-cosmo-blue"
          >
            Start free &rarr;
          </NuxtLink>
        </div>

        <!-- Scale (Pro) -->
        <div class="relative bg-cosmo-surface border border-cosmo-purple/25 rounded-2xl p-8 flex flex-col overflow-hidden">
          <!-- Subtle gradient accent -->
          <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cosmo-purple/50 to-transparent" />

          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-cosmo-text">Scale</h3>
            <span class="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cosmo-purple bg-cosmo-purple/10 rounded-full">Coming soon</span>
          </div>

          <div class="flex items-baseline gap-1 mb-2">
            <span class="text-5xl font-bold text-cosmo-text tracking-tight">$9</span>
            <span class="text-sm text-cosmo-text-dim">/month</span>
          </div>
          <p class="text-sm text-cosmo-text-dim mb-8">For products with traction</p>

          <ul class="space-y-3.5 flex-1">
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-purple shrink-0 mt-0.5" />
              <span><strong class="text-cosmo-text font-medium">Unlimited</strong> projects</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-purple shrink-0 mt-0.5" />
              <span><strong class="text-cosmo-text font-medium">Unlimited</strong> feedback</span>
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-purple shrink-0 mt-0.5" />
              Custom branding
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-purple shrink-0 mt-0.5" />
              Priority support
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-purple shrink-0 mt-0.5" />
              Higher rate limits
            </li>
            <li class="flex items-start gap-3 text-sm text-cosmo-text-muted">
              <Icon name="lucide:check" class="w-4 h-4 text-cosmo-purple shrink-0 mt-0.5" />
              Everything in Launch
            </li>
          </ul>

          <div class="mt-8 space-y-3">
            <SharedWaitlistForm source="pricing" />
            <p class="text-xs text-center text-cosmo-text-dim">
              Join the waitlist &mdash; early supporters get 3 months free
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

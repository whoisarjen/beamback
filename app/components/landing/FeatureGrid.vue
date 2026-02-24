<template>
  <section id="features" class="relative py-24 sm:py-32 px-5">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="max-w-2xl mb-16">
        <p class="text-sm font-medium text-cosmo-blue uppercase tracking-wider mb-3">How it works</p>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-cosmo-text leading-tight">
          Feedback on
          <span class="font-display italic text-cosmo-blue-bright">autopilot</span>
        </h2>
        <p class="mt-5 text-lg text-cosmo-text-muted leading-relaxed">
          No more building custom forms, wiring up email endpoints, or managing spreadsheets. Beamback handles the entire feedback loop so you can focus on building.
        </p>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
        <!-- 1. Embeddable Widget (spans 4) -->
        <div class="md:col-span-4 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group">
          <div class="flex items-center gap-3 mb-5">
            <div class="p-2.5 bg-cosmo-blue/10 rounded-xl">
              <Icon name="lucide:code-2" class="w-5 h-5 text-cosmo-blue" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-cosmo-text">One line of code</h3>
              <p class="text-sm text-cosmo-text-muted">Paste. Deploy. Done.</p>
            </div>
          </div>
          <div class="bg-cosmo-bg rounded-xl p-5 font-mono text-sm border border-cosmo-border/60 overflow-x-auto">
            <div class="text-cosmo-text-dim mb-1">&lt;!-- Add before &lt;/body&gt; --&gt;</div>
            <div class="whitespace-nowrap">
              <span class="text-cosmo-purple">&lt;script</span>
              <span class="text-cosmo-blue"> src</span><span class="text-cosmo-text-dim">=</span><span class="text-cosmo-success">"beamback.whoisarjen.com/widget.js"</span>
            </div>
            <div class="whitespace-nowrap">
              &nbsp;&nbsp;<span class="text-cosmo-blue">data-api-key</span><span class="text-cosmo-text-dim">=</span><span class="text-cosmo-success">"ak_your_key_here"</span>
              <span class="text-cosmo-blue"> defer</span><span class="text-cosmo-purple">&gt;&lt;/script&gt;</span>
            </div>
          </div>
          <p class="mt-4 text-sm text-cosmo-text-dim">
            Customizable position, color, and button text. Under 3KB. No dependencies.
          </p>
        </div>

        <!-- 2. Spam Protection (spans 2) -->
        <div class="md:col-span-2 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group flex flex-col">
          <div class="p-2.5 bg-cosmo-success/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:shield-check" class="w-5 h-5 text-cosmo-success" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">Built-in spam shield</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted flex-1">
            Honeypot fields, IP rate limiting, and vote deduplication. Your inbox stays clean without any configuration.
          </p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="px-2.5 py-1 text-[11px] font-medium text-cosmo-success bg-cosmo-success/8 border border-cosmo-success/15 rounded-lg">Rate Limiting</span>
            <span class="px-2.5 py-1 text-[11px] font-medium text-cosmo-success bg-cosmo-success/8 border border-cosmo-success/15 rounded-lg">Honeypot</span>
            <span class="px-2.5 py-1 text-[11px] font-medium text-cosmo-success bg-cosmo-success/8 border border-cosmo-success/15 rounded-lg">IP Dedup</span>
          </div>
        </div>

        <!-- 3. Public Board (spans 2) -->
        <div class="md:col-span-2 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group flex flex-col">
          <div class="p-2.5 bg-cosmo-purple/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:message-circle" class="w-5 h-5 text-cosmo-purple" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">Public voting board</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted flex-1">
            Users submit ideas and vote on what matters most. You build what they actually want instead of guessing.
          </p>
          <div class="mt-5 space-y-1.5">
            <div class="flex items-center justify-between bg-cosmo-elevated/60 rounded-lg px-3 py-2">
              <span class="text-xs text-cosmo-text truncate">Dark mode</span>
              <span class="text-xs font-semibold text-cosmo-blue">47</span>
            </div>
            <div class="flex items-center justify-between bg-cosmo-elevated/60 rounded-lg px-3 py-2">
              <span class="text-xs text-cosmo-text truncate">CSV export</span>
              <span class="text-xs font-semibold text-cosmo-text-muted">31</span>
            </div>
          </div>
        </div>

        <!-- 4. Status Pipeline (spans 4) -->
        <div class="md:col-span-4 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group">
          <div class="flex items-center gap-3 mb-5">
            <div class="p-2.5 bg-cosmo-warning/10 rounded-xl">
              <Icon name="lucide:git-branch" class="w-5 h-5 text-cosmo-warning" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-cosmo-text">Track progress transparently</h3>
              <p class="text-sm text-cosmo-text-muted">Move ideas through your pipeline. Users see real progress.</p>
            </div>
          </div>
          <!-- Pipeline visualization -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <div class="flex items-center gap-2 bg-cosmo-blue/8 border border-cosmo-blue/15 rounded-xl px-4 py-2.5">
              <div class="w-2 h-2 rounded-full bg-cosmo-blue" />
              <span class="text-sm font-medium text-cosmo-blue">New</span>
            </div>
            <Icon name="lucide:chevron-right" class="w-4 h-4 text-cosmo-text-dim hidden sm:block" />
            <div class="flex items-center gap-2 bg-cosmo-purple/8 border border-cosmo-purple/15 rounded-xl px-4 py-2.5">
              <div class="w-2 h-2 rounded-full bg-cosmo-purple" />
              <span class="text-sm font-medium text-cosmo-purple">Planned</span>
            </div>
            <Icon name="lucide:chevron-right" class="w-4 h-4 text-cosmo-text-dim hidden sm:block" />
            <div class="flex items-center gap-2 bg-cosmo-warning/8 border border-cosmo-warning/15 rounded-xl px-4 py-2.5">
              <div class="w-2 h-2 rounded-full bg-cosmo-warning" />
              <span class="text-sm font-medium text-cosmo-warning">Building</span>
            </div>
            <Icon name="lucide:chevron-right" class="w-4 h-4 text-cosmo-text-dim hidden sm:block" />
            <div class="flex items-center gap-2 bg-cosmo-success/8 border border-cosmo-success/15 rounded-xl px-4 py-2.5">
              <div class="w-2 h-2 rounded-full bg-cosmo-success" />
              <span class="text-sm font-medium text-cosmo-success">Shipped</span>
            </div>
          </div>
        </div>

        <!-- 5. Privacy-first (spans 3) -->
        <div class="md:col-span-3 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group">
          <div class="p-2.5 bg-cosmo-blue-bright/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:lock" class="w-5 h-5 text-cosmo-blue-bright" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">Privacy-first by design</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted">
            IPs are hashed, not stored. No tracking pixels. No third-party analytics. GDPR-friendly with one-click data deletion. Your users' privacy is non-negotiable.
          </p>
        </div>

        <!-- 6. Open Source (spans 3) -->
        <div class="md:col-span-3 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group">
          <div class="p-2.5 bg-cosmo-error/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:heart" class="w-5 h-5 text-cosmo-error" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">100% open source</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted">
            Every line of code is on GitHub. Self-host it, fork it, contribute to it. No vendor lock-in, no surprises. Built with Nuxt, Prisma, and Tailwind.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

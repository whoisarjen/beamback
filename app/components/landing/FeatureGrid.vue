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
        <!-- 1. Embeddable Widget - code + live widget preview (spans 4) -->
        <div class="md:col-span-4 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group overflow-hidden">
          <div class="flex items-center gap-3 mb-5">
            <div class="p-2.5 bg-cosmo-blue/10 rounded-xl">
              <Icon name="lucide:code-2" class="w-5 h-5 text-cosmo-blue" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-cosmo-text">One line of code</h3>
              <p class="text-sm text-cosmo-text-muted">Paste. Deploy. Done.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Code snippet -->
            <div class="bg-cosmo-bg rounded-xl p-5 font-mono text-sm border border-cosmo-border/60 overflow-x-auto">
              <div class="text-cosmo-text-dim mb-1">&lt;!-- Add before &lt;/body&gt; --&gt;</div>
              <div class="whitespace-nowrap">
                <span class="text-cosmo-purple">&lt;script</span>
              </div>
              <div class="whitespace-nowrap pl-3">
                <span class="text-cosmo-blue">src</span><span class="text-cosmo-text-dim">=</span><span class="text-cosmo-success">"beamback.io/w.js"</span>
              </div>
              <div class="whitespace-nowrap pl-3">
                <span class="text-cosmo-blue">data-key</span><span class="text-cosmo-text-dim">=</span><span class="text-cosmo-success">"ak_..."</span>
              </div>
              <div class="whitespace-nowrap pl-3">
                <span class="text-cosmo-blue">defer</span>
              </div>
              <div class="whitespace-nowrap">
                <span class="text-cosmo-purple">&gt;&lt;/script&gt;</span>
              </div>
            </div>

            <!-- Mini widget preview -->
            <div class="relative bg-cosmo-bg rounded-xl border border-cosmo-border/60 p-4 flex items-end justify-end overflow-hidden">
              <!-- Simulated page lines -->
              <div class="absolute top-4 left-4 space-y-2">
                <div class="w-20 h-2 rounded-full bg-cosmo-elevated/60" />
                <div class="w-32 h-2 rounded-full bg-cosmo-elevated/40" />
                <div class="w-24 h-2 rounded-full bg-cosmo-elevated/40" />
                <div class="w-16 h-1.5 rounded-full bg-cosmo-elevated/30 mt-3" />
                <div class="w-28 h-1.5 rounded-full bg-cosmo-elevated/30" />
              </div>

              <!-- Mini widget bubble + tooltip -->
              <div class="flex flex-col items-end gap-2">
                <div class="bg-cosmo-surface border border-cosmo-border rounded-lg px-3 py-2 shadow-lg">
                  <p class="text-[10px] text-cosmo-text-muted whitespace-nowrap">Got feedback?</p>
                </div>
                <div class="w-10 h-10 rounded-full bg-cosmo-blue flex items-center justify-center shadow-lg shadow-cosmo-blue/25">
                  <Icon name="lucide:message-square-plus" class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <p class="mt-4 text-sm text-cosmo-text-dim">
            Customizable position, colors, and labels. Under 3KB gzipped. Zero dependencies.
          </p>
        </div>

        <!-- 2. Spam Protection (spans 2) -->
        <div class="md:col-span-2 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group flex flex-col">
          <div class="p-2.5 bg-cosmo-success/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:shield-check" class="w-5 h-5 text-cosmo-success" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">Built-in spam shield</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted flex-1">
            Honeypot fields, IP rate limiting, and vote deduplication keep your inbox clean with zero config.
          </p>
          <!-- Visual: blocked spam items -->
          <div class="mt-5 space-y-2">
            <div class="flex items-center gap-2 bg-cosmo-error/5 border border-cosmo-error/10 rounded-lg px-3 py-2 opacity-50">
              <Icon name="lucide:slash" class="w-3 h-3 text-cosmo-error shrink-0" />
              <span class="text-[11px] text-cosmo-error/80 line-through truncate">Buy cheap watches now!!!</span>
              <span class="ml-auto text-[9px] font-medium text-cosmo-error bg-cosmo-error/10 px-1.5 py-0.5 rounded">Blocked</span>
            </div>
            <div class="flex items-center gap-2 bg-cosmo-error/5 border border-cosmo-error/10 rounded-lg px-3 py-2 opacity-40">
              <Icon name="lucide:slash" class="w-3 h-3 text-cosmo-error shrink-0" />
              <span class="text-[11px] text-cosmo-error/80 line-through truncate">Visit my website for...</span>
              <span class="ml-auto text-[9px] font-medium text-cosmo-error bg-cosmo-error/10 px-1.5 py-0.5 rounded">Blocked</span>
            </div>
            <div class="flex items-center gap-2 bg-cosmo-success/5 border border-cosmo-success/10 rounded-lg px-3 py-2">
              <Icon name="lucide:check" class="w-3 h-3 text-cosmo-success shrink-0" />
              <span class="text-[11px] text-cosmo-text-muted truncate">Add CSV export for analytics</span>
              <span class="ml-auto text-[9px] font-medium text-cosmo-success bg-cosmo-success/10 px-1.5 py-0.5 rounded">Passed</span>
            </div>
          </div>
        </div>

        <!-- 3. Public Board with visual demo (spans 3) -->
        <div class="md:col-span-3 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group flex flex-col">
          <div class="p-2.5 bg-cosmo-purple/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:message-circle" class="w-5 h-5 text-cosmo-purple" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">Public voting board</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted">
            Users submit ideas and vote on what matters most. Build what they actually want.
          </p>

          <!-- Visual: mini voting board -->
          <div class="mt-5 space-y-2 flex-1">
            <div class="flex items-center gap-3 bg-cosmo-bg/60 rounded-xl px-3.5 py-2.5 border border-cosmo-border/40">
              <div class="flex flex-col items-center min-w-7 py-1 px-1.5 bg-cosmo-blue/10 rounded-lg border border-cosmo-blue/15">
                <Icon name="lucide:chevron-up" class="w-3 h-3 text-cosmo-blue" />
                <span class="text-[11px] font-bold text-cosmo-blue">47</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-xs text-cosmo-text font-medium block truncate">Dark mode toggle</span>
                <span class="text-[10px] text-cosmo-text-dim">12 comments</span>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-cosmo-warning/10 text-cosmo-warning border border-cosmo-warning/15 shrink-0">Building</span>
            </div>
            <div class="flex items-center gap-3 bg-cosmo-bg/60 rounded-xl px-3.5 py-2.5 border border-cosmo-border/40">
              <div class="flex flex-col items-center min-w-7 py-1 px-1.5 bg-cosmo-elevated rounded-lg border border-cosmo-border/40">
                <Icon name="lucide:chevron-up" class="w-3 h-3 text-cosmo-text-dim" />
                <span class="text-[11px] font-bold text-cosmo-text-muted">31</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-xs text-cosmo-text font-medium block truncate">CSV export</span>
                <span class="text-[10px] text-cosmo-text-dim">5 comments</span>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-cosmo-purple/10 text-cosmo-purple border border-cosmo-purple/15 shrink-0">Planned</span>
            </div>
            <div class="flex items-center gap-3 bg-cosmo-bg/60 rounded-xl px-3.5 py-2.5 border border-cosmo-border/40">
              <div class="flex flex-col items-center min-w-7 py-1 px-1.5 bg-cosmo-elevated rounded-lg border border-cosmo-border/40">
                <Icon name="lucide:chevron-up" class="w-3 h-3 text-cosmo-text-dim" />
                <span class="text-[11px] font-bold text-cosmo-text-muted">18</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-xs text-cosmo-text font-medium block truncate">Slack notifications</span>
                <span class="text-[10px] text-cosmo-text-dim">3 comments</span>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-cosmo-blue/10 text-cosmo-blue border border-cosmo-blue/15 shrink-0">New</span>
            </div>
          </div>
        </div>

        <!-- 4. Status Pipeline with Kanban-style visual (spans 3) -->
        <div class="md:col-span-3 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group flex flex-col">
          <div class="flex items-center gap-3 mb-5">
            <div class="p-2.5 bg-cosmo-warning/10 rounded-xl">
              <Icon name="lucide:git-branch" class="w-5 h-5 text-cosmo-warning" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-cosmo-text">Public roadmap</h3>
              <p class="text-sm text-cosmo-text-muted">Users see real progress. Builds trust.</p>
            </div>
          </div>

          <!-- Pipeline steps visual -->
          <div class="flex-1 flex flex-col justify-end">
            <!-- Pipeline flow -->
            <div class="flex items-center gap-1.5 mb-4 flex-wrap">
              <div class="flex items-center gap-1.5 bg-cosmo-blue/8 border border-cosmo-blue/15 rounded-lg px-3 py-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-cosmo-blue" />
                <span class="text-[11px] font-medium text-cosmo-blue">New</span>
              </div>
              <Icon name="lucide:chevron-right" class="w-3 h-3 text-cosmo-text-dim shrink-0" />
              <div class="flex items-center gap-1.5 bg-cosmo-purple/8 border border-cosmo-purple/15 rounded-lg px-3 py-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-cosmo-purple" />
                <span class="text-[11px] font-medium text-cosmo-purple">Planned</span>
              </div>
              <Icon name="lucide:chevron-right" class="w-3 h-3 text-cosmo-text-dim shrink-0" />
              <div class="flex items-center gap-1.5 bg-cosmo-warning/8 border border-cosmo-warning/15 rounded-lg px-3 py-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-cosmo-warning" />
                <span class="text-[11px] font-medium text-cosmo-warning">Building</span>
              </div>
              <Icon name="lucide:chevron-right" class="w-3 h-3 text-cosmo-text-dim shrink-0" />
              <div class="flex items-center gap-1.5 bg-cosmo-success/8 border border-cosmo-success/15 rounded-lg px-3 py-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-cosmo-success" />
                <span class="text-[11px] font-medium text-cosmo-success">Shipped</span>
              </div>
            </div>

            <!-- Mini Kanban columns -->
            <div class="grid grid-cols-4 gap-1.5">
              <div class="space-y-1">
                <div class="h-1 rounded-full bg-cosmo-blue/40 mb-1.5" />
                <div class="bg-cosmo-bg/60 border border-cosmo-border/30 rounded-lg px-2 py-1.5">
                  <p class="text-[9px] text-cosmo-text truncate">Webhooks API</p>
                </div>
                <div class="bg-cosmo-bg/60 border border-cosmo-border/30 rounded-lg px-2 py-1.5">
                  <p class="text-[9px] text-cosmo-text truncate">Multi-language</p>
                </div>
              </div>
              <div class="space-y-1">
                <div class="h-1 rounded-full bg-cosmo-purple/40 mb-1.5" />
                <div class="bg-cosmo-bg/60 border border-cosmo-border/30 rounded-lg px-2 py-1.5">
                  <p class="text-[9px] text-cosmo-text truncate">CSV export</p>
                </div>
              </div>
              <div class="space-y-1">
                <div class="h-1 rounded-full bg-cosmo-warning/40 mb-1.5" />
                <div class="bg-cosmo-bg/60 border border-cosmo-border/30 rounded-lg px-2 py-1.5">
                  <p class="text-[9px] text-cosmo-text truncate">Dark mode</p>
                </div>
                <div class="bg-cosmo-bg/60 border border-cosmo-border/30 rounded-lg px-2 py-1.5">
                  <p class="text-[9px] text-cosmo-text truncate">Slack alerts</p>
                </div>
              </div>
              <div class="space-y-1">
                <div class="h-1 rounded-full bg-cosmo-success/40 mb-1.5" />
                <div class="bg-cosmo-bg/60 border border-cosmo-border/30 rounded-lg px-2 py-1.5">
                  <p class="text-[9px] text-cosmo-text truncate">Widget v2</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Privacy-first (spans 3) -->
        <div class="md:col-span-3 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group">
          <div class="p-2.5 bg-cosmo-blue-bright/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:lock" class="w-5 h-5 text-cosmo-blue-bright" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">Privacy-first by design</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted mb-5">
            IPs are hashed, not stored. No tracking pixels. No third-party analytics. GDPR-friendly out of the box.
          </p>
          <!-- Visual: privacy checklist -->
          <div class="space-y-2">
            <div class="flex items-center gap-2.5">
              <div class="w-5 h-5 rounded-md bg-cosmo-success/10 border border-cosmo-success/20 flex items-center justify-center">
                <Icon name="lucide:check" class="w-3 h-3 text-cosmo-success" />
              </div>
              <span class="text-xs text-cosmo-text-muted">IPs hashed with one-way salt</span>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="w-5 h-5 rounded-md bg-cosmo-success/10 border border-cosmo-success/20 flex items-center justify-center">
                <Icon name="lucide:check" class="w-3 h-3 text-cosmo-success" />
              </div>
              <span class="text-xs text-cosmo-text-muted">Zero tracking pixels or cookies</span>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="w-5 h-5 rounded-md bg-cosmo-success/10 border border-cosmo-success/20 flex items-center justify-center">
                <Icon name="lucide:check" class="w-3 h-3 text-cosmo-success" />
              </div>
              <span class="text-xs text-cosmo-text-muted">One-click data deletion</span>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="w-5 h-5 rounded-md bg-cosmo-success/10 border border-cosmo-success/20 flex items-center justify-center">
                <Icon name="lucide:check" class="w-3 h-3 text-cosmo-success" />
              </div>
              <span class="text-xs text-cosmo-text-muted">No third-party analytics</span>
            </div>
          </div>
        </div>

        <!-- 6. Open Source (spans 3) -->
        <div class="md:col-span-3 bg-cosmo-surface border border-cosmo-border rounded-2xl p-6 sm:p-8 hover:border-cosmo-border-bright transition-colors group">
          <div class="p-2.5 bg-cosmo-error/10 rounded-xl w-fit mb-5">
            <Icon name="lucide:heart" class="w-5 h-5 text-cosmo-error" />
          </div>
          <h3 class="text-lg font-semibold text-cosmo-text">100% open source</h3>
          <p class="mt-2 text-sm text-cosmo-text-muted mb-5">
            Every line of code is on GitHub. Self-host it, fork it, contribute to it. No vendor lock-in, no surprises.
          </p>
          <!-- Visual: tech stack badges -->
          <div class="flex flex-wrap gap-2">
            <div class="flex items-center gap-1.5 bg-cosmo-elevated/60 border border-cosmo-border/50 rounded-lg px-3 py-1.5">
              <div class="w-3 h-3 rounded-sm bg-[#00DC82]" />
              <span class="text-[11px] font-medium text-cosmo-text">Nuxt</span>
            </div>
            <div class="flex items-center gap-1.5 bg-cosmo-elevated/60 border border-cosmo-border/50 rounded-lg px-3 py-1.5">
              <div class="w-3 h-3 rounded-sm bg-[#2D3748]" />
              <span class="text-[11px] font-medium text-cosmo-text">Prisma</span>
            </div>
            <div class="flex items-center gap-1.5 bg-cosmo-elevated/60 border border-cosmo-border/50 rounded-lg px-3 py-1.5">
              <div class="w-3 h-3 rounded-sm bg-[#38BDF8]" />
              <span class="text-[11px] font-medium text-cosmo-text">Tailwind</span>
            </div>
            <div class="flex items-center gap-1.5 bg-cosmo-elevated/60 border border-cosmo-border/50 rounded-lg px-3 py-1.5">
              <div class="w-3 h-3 rounded-sm bg-cosmo-text-dim" />
              <span class="text-[11px] font-medium text-cosmo-text">MIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

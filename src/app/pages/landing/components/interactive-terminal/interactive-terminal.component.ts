import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { TerminalWindowComponent } from '../../../../shared/ui/terminal-window/terminal-window.component';

type TabId = 'app' | 'schema' | 'deploy';

interface CodeTab {
  id: TabId;
  label: string;
  fileName: string;
}

@Component({
  selector: 'cx-interactive-terminal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, TerminalWindowComponent, TranslatePipe],
  template: `
    <section
      id="methodology"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="methodology-heading"
    >
      <div
        class="mx-auto grid max-w-wide items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8"
      >
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-electric">
            {{ 'method.eyebrow' | t: lang() }}
          </p>
          <h2
            id="methodology-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'method.title' | t: lang() }}
          </h2>
          <p class="mt-4 leading-relaxed text-codexa-secondary">
            {{ 'method.subtitle' | t: lang() }}
          </p>

          <ul class="mt-8 space-y-4">
            @for (item of principles; track item.titleKey) {
              <li class="flex gap-3">
                <span
                  class="mt-1 font-mono text-sm text-codexa-emerald"
                  aria-hidden="true"
                  >▸</span
                >
                <div>
                  <p class="font-medium text-codexa-primary">
                    {{ item.titleKey | t: lang() }}
                  </p>
                  <p class="mt-1 text-sm text-codexa-secondary">
                    {{ item.bodyKey | t: lang() }}
                  </p>
                </div>
              </li>
            }
          </ul>

          <div class="mt-8">
            <cx-button variant="secondary" (click)="scrollTo('curriculum')">
              {{ 'method.cta' | t: lang() }}
            </cx-button>
          </div>
        </div>

        <div dir="ltr" class="[direction:ltr]">
          <div
            class="mb-3 flex flex-wrap gap-1 rounded-codexa border border-codexa-border bg-codexa-surface/80 p-1"
            role="tablist"
            [attr.aria-label]="'method.tabsLabel' | t: lang()"
          >
            @for (tab of tabs; track tab.id) {
              <button
                type="button"
                role="tab"
                class="rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                [class.bg-codexa-obsidian]="activeTabId() === tab.id"
                [class.text-codexa-cyan]="activeTabId() === tab.id"
                [class.text-codexa-muted]="activeTabId() !== tab.id"
                [attr.aria-selected]="activeTabId() === tab.id"
                (click)="selectTab(tab.id)"
              >
                {{ tab.label }}
              </button>
            }
          </div>

          <cx-terminal-window [fileName]="activeFileName()">
            @switch (activeTabId()) {
              @case ('app') {
                <pre class="m-0 whitespace-pre-wrap text-left text-[12px] leading-relaxed sm:text-[13px]">
<span class="text-codexa-muted">// Angular signal-driven shell</span>
<span class="text-codexa-electric">import</span> &#123; Component, signal &#125; <span class="text-codexa-electric">from</span> <span class="text-codexa-cyan">'&#64;angular/core'</span>;

<span class="text-codexa-electric">&#64;Component</span>(&#123;
  selector: <span class="text-codexa-cyan">'cx-dashboard'</span>,
  template: <span class="text-codexa-cyan">'&lt;h1&gt;[title]&lt;/h1&gt;'</span>,
&#125;)
<span class="text-codexa-electric">export class</span> <span class="text-codexa-emerald">Dashboard</span> &#123;
  title = signal(<span class="text-codexa-cyan">'Codexa Cohort'</span>);
  ship() &#123; <span class="text-codexa-muted">/* CI kicks in */</span> &#125;
&#125;
                </pre>
              }
              @case ('schema') {
                <pre class="m-0 whitespace-pre-wrap text-left text-[12px] leading-relaxed sm:text-[13px]">
<span class="text-codexa-muted">// Data model · Prisma</span>
<span class="text-codexa-electric">model</span> <span class="text-codexa-emerald">Student</span> &#123;
  id        <span class="text-codexa-cyan">String</span>   &#64;id &#64;default(cuid())
  email     <span class="text-codexa-cyan">String</span>   &#64;unique
  track     <span class="text-codexa-cyan">Track</span>
  projects  <span class="text-codexa-emerald">Project</span>[]
  createdAt <span class="text-codexa-cyan">DateTime</span> &#64;default(now())
&#125;

<span class="text-codexa-electric">enum</span> <span class="text-codexa-emerald">Track</span> &#123;
  CORE
  ELITE
&#125;
                </pre>
              }
              @case ('deploy') {
                <pre class="m-0 whitespace-pre-wrap text-left text-[12px] leading-relaxed sm:text-[13px]">
<span class="text-codexa-muted">#!/usr/bin/env bash</span>
<span class="text-codexa-emerald">set</span> -euo pipefail

<span class="text-codexa-electric">echo</span> <span class="text-codexa-cyan">"▸ Building Codexa API..."</span>
npm run build

<span class="text-codexa-electric">echo</span> <span class="text-codexa-cyan">"▸ Running migration..."</span>
npx prisma migrate deploy

<span class="text-codexa-electric">echo</span> <span class="text-codexa-cyan">"▸ Shipping container..."</span>
docker compose up -d --build

<span class="text-codexa-emerald">echo</span> <span class="text-codexa-cyan">"✓ Production healthy"</span>
                </pre>
              }
            }
          </cx-terminal-window>
        </div>
      </div>
    </section>
  `,
})
export class InteractiveTerminalComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly principles = [
    { titleKey: 'method.p1.title', bodyKey: 'method.p1.body' },
    { titleKey: 'method.p2.title', bodyKey: 'method.p2.body' },
    { titleKey: 'method.p3.title', bodyKey: 'method.p3.body' },
  ];

  protected readonly tabs: CodeTab[] = [
    { id: 'app', label: 'app.ts', fileName: 'app.ts' },
    { id: 'schema', label: 'schema.prisma', fileName: 'schema.prisma' },
    { id: 'deploy', label: 'deploy.sh', fileName: 'deploy.sh' },
  ];

  protected readonly activeTabId = signal<TabId>('app');

  protected activeFileName(): string {
    return this.tabs.find((t) => t.id === this.activeTabId())?.fileName ?? 'app.ts';
  }

  protected selectTab(id: TabId): void {
    this.activeTabId.set(id);
  }

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

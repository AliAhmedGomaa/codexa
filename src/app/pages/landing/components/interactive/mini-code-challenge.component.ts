import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucidePlay, LucideRotateCcw } from '@lucide/angular';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

type ChoiceId = 'signal' | 'subject' | 'promise';

@Component({
  selector: 'cx-mini-code-challenge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BadgeComponent,
    ButtonComponent,
    TranslatePipe,
    RevealOnScrollDirective,
    LucidePlay,
    LucideRotateCcw,
  ],
  template: `
    <section
      id="challenge"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="challenge-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center" cxReveal>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-electric">
            {{ 'challenge.eyebrow' | t: lang() }}
          </p>
          <h2
            id="challenge-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'challenge.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'challenge.subtitle' | t: lang() }}
          </p>
        </div>

        <div
          class="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-[1.2fr_0.8fr]"
          cxReveal
          cxRevealDelay="80ms"
        >
          <div
            dir="ltr"
            class="cx-terminal overflow-hidden rounded-codexa border border-white/10 bg-[#090D16] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)] [direction:ltr]"
          >
            <div
              class="flex h-10 items-center gap-3 border-b border-white/10 bg-[#0F172A] px-4"
            >
              <div class="flex items-center gap-1.5" aria-hidden="true">
                <span class="h-3 w-3 rounded-full bg-[#FF5F57]"></span>
                <span class="h-3 w-3 rounded-full bg-[#FEBC2E]"></span>
                <span class="h-3 w-3 rounded-full bg-[#28C840]"></span>
              </div>
              <span class="font-mono text-xs text-slate-400">counter.component.ts</span>
              @if (passed()) {
                <cx-badge variant="emerald" class="ms-auto">PASS</cx-badge>
              }
            </div>

            <pre
              class="m-0 overflow-x-auto bg-[#070A12] p-4 font-mono text-[12px] leading-relaxed text-slate-100 sm:p-5 sm:text-[13px]"
            ><span class="text-slate-500">// Fix the reactive state so the UI updates</span>
<span class="text-codexa-electric">import</span> &#123; Component, ??? &#125; <span class="text-codexa-electric">from</span> <span class="text-codexa-cyan">'&#64;angular/core'</span>;

<span class="text-codexa-electric">&#64;Component</span>(&#123;
  selector: <span class="text-codexa-cyan">'cx-counter'</span>,
  template: <span class="text-codexa-cyan">'&lt;button (click)="inc()"&gt;[count]&lt;/button&gt;'</span>,
&#125;)
<span class="text-codexa-electric">export class</span> <span class="text-codexa-emerald">Counter</span> &#123;
  count = ???(<span class="text-codexa-cyan">0</span>);
  inc() &#123; this.count.update(v =&gt; v + <span class="text-codexa-cyan">1</span>); &#125;
&#125;</pre>

            <div class="border-t border-white/10 bg-[#070A12] px-4 py-3 sm:px-5">
              <p class="mb-2 font-mono text-xs text-slate-400">
                {{ 'challenge.prompt' | t: lang() }}
              </p>
              <div class="flex flex-wrap gap-2" role="radiogroup" [attr.aria-label]="'challenge.prompt' | t: lang()">
                @for (choice of choices; track choice.id) {
                  <button
                    type="button"
                    role="radio"
                    class="rounded-md border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                    [attr.aria-checked]="selected() === choice.id"
                    [class.border-codexa-electric]="selected() === choice.id"
                    [class.bg-codexa-electric/15]="selected() === choice.id"
                    [class.text-codexa-electric]="selected() === choice.id"
                    [class.border-white/10]="selected() !== choice.id"
                    [class.text-slate-300]="selected() !== choice.id"
                    [disabled]="running()"
                    (click)="selected.set(choice.id)"
                  >
                    {{ choice.label }}
                  </button>
                }
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div
              dir="ltr"
              class="flex-1 rounded-codexa border border-codexa-border bg-codexa-surface p-4 font-mono text-xs [direction:ltr]"
              role="log"
              aria-live="polite"
            >
              <p class="text-codexa-muted">$ codexa test --watch=false</p>
              @for (line of logs(); track $index) {
                <p
                  class="mt-1"
                  [class.text-codexa-emerald]="line.ok"
                  [class.text-codexa-secondary]="!line.ok"
                >
                  {{ line.text }}
                </p>
              }
              @if (running()) {
                <p class="mt-1 animate-pulse text-codexa-electric">
                  ▸ compiling…
                </p>
              }
            </div>

            <div class="flex flex-wrap gap-2">
              <cx-button
                variant="primary"
                [disabled]="!selected() || running()"
                (click)="runTests()"
              >
                <svg lucidePlay [size]="16"></svg>
                {{ 'challenge.run' | t: lang() }}
              </cx-button>
              <cx-button variant="secondary" [disabled]="running()" (click)="reset()">
                <svg lucideRotateCcw [size]="16"></svg>
                {{ 'challenge.reset' | t: lang() }}
              </cx-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class MiniCodeChallengeComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly choices: { id: ChoiceId; label: string }[] = [
    { id: 'signal', label: 'signal' },
    { id: 'subject', label: 'Subject' },
    { id: 'promise', label: 'Promise' },
  ];

  protected readonly selected = signal<ChoiceId | null>(null);
  protected readonly running = signal(false);
  protected readonly passed = signal(false);
  protected readonly logs = signal<{ text: string; ok: boolean }[]>([]);

  protected readonly canRun = computed(
    () => this.selected() !== null && !this.running(),
  );

  runTests(): void {
    const choice = this.selected();
    if (!choice || this.running()) return;

    this.running.set(true);
    this.passed.set(false);
    this.logs.set([{ text: '▸ Starting compilation…', ok: false }]);

    window.setTimeout(() => {
      if (choice === 'signal') {
        this.logs.set([
          { text: '✔ Compilation successful', ok: true },
          { text: '✔ 3/3 Unit Tests Passed', ok: true },
          { text: '✔ Change detection verified', ok: true },
        ]);
        this.passed.set(true);
      } else {
        this.logs.set([
          { text: '✖ Compilation failed', ok: false },
          {
            text:
              choice === 'subject'
                ? 'Error: Subject is not a valid Angular signal factory'
                : 'Error: Promise is not reactive for template bindings',
            ok: false,
          },
          { text: '✖ 0/3 Unit Tests Passed', ok: false },
        ]);
        this.passed.set(false);
      }
      this.running.set(false);
    }, 1000);
  }

  reset(): void {
    this.selected.set(null);
    this.running.set(false);
    this.passed.set(false);
    this.logs.set([]);
  }
}

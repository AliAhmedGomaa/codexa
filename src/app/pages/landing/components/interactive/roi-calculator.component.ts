import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { CardComponent } from '../../../../shared/ui/card/card.component';

type Role = 'fullstack' | 'backend' | 'devops';
type Timeline = 3 | 6 | 12;

@Component({
  selector: 'cx-roi-calculator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section
      id="roi"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="roi-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center" cxReveal>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-cyan">
            {{ 'roi.eyebrow' | t: lang() }}
          </p>
          <h2
            id="roi-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'roi.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'roi.subtitle' | t: lang() }}
          </p>
        </div>

        <div class="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2" cxReveal>
          <cx-card [interactive]="false" class="space-y-8">
            <div>
              <label class="font-mono text-xs uppercase tracking-wider text-codexa-muted">
                {{ 'roi.roleLabel' | t: lang() }}
              </label>
              <div class="mt-3 flex flex-wrap gap-2" role="radiogroup">
                @for (r of roles; track r.id) {
                  <button
                    type="button"
                    role="radio"
                    class="rounded-codexa border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                    [attr.aria-checked]="role() === r.id"
                    [class.border-codexa-electric]="role() === r.id"
                    [class.bg-codexa-electric/15]="role() === r.id"
                    [class.text-codexa-electric]="role() === r.id"
                    [class.border-codexa-border]="role() !== r.id"
                    [class.text-codexa-secondary]="role() !== r.id"
                    (click)="role.set(r.id)"
                  >
                    {{ r.labelKey | t: lang() }}
                  </button>
                }
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between gap-3">
                <label
                  for="roi-timeline"
                  class="font-mono text-xs uppercase tracking-wider text-codexa-muted"
                >
                  {{ 'roi.timelineLabel' | t: lang() }}
                </label>
                <span class="font-mono text-sm text-codexa-electric">
                  {{ timeline() }} {{ 'roi.months' | t: lang() }}
                </span>
              </div>
              <input
                id="roi-timeline"
                type="range"
                min="0"
                max="2"
                step="1"
                class="mt-4 w-full accent-[#0064FF]"
                [value]="timelineIndex()"
                [attr.aria-valuetext]="timeline() + ' ' + ('roi.months' | t: lang())"
                (input)="onTimelineInput($event)"
              />
              <div class="mt-2 flex justify-between font-mono text-[11px] text-codexa-muted">
                <span>3</span><span>6</span><span>12</span>
              </div>
            </div>
          </cx-card>

          <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <cx-card [interactive]="false" class="glow-primary">
              <p class="font-mono text-xs uppercase tracking-wider text-codexa-muted">
                {{ 'roi.entry' | t: lang() }}
              </p>
              <p class="mt-2 text-3xl font-bold tracking-tight text-codexa-primary">
                {{ formatCurrency(result().entry) }}
              </p>
              <p class="mt-1 text-sm text-codexa-secondary">
                {{ 'roi.entryHint' | t: lang() }}
              </p>
            </cx-card>

            <cx-card [interactive]="false">
              <p class="font-mono text-xs uppercase tracking-wider text-codexa-muted">
                {{ 'roi.growth' | t: lang() }}
              </p>
              <p class="mt-2 text-3xl font-bold tracking-tight text-codexa-emerald">
                +{{ result().growth }}%
              </p>
              <p class="mt-1 text-sm text-codexa-secondary">
                {{ 'roi.growthHint' | t: lang() }}
              </p>
            </cx-card>

            <cx-card [interactive]="false">
              <p class="font-mono text-xs uppercase tracking-wider text-codexa-muted">
                {{ 'roi.vsDegree' | t: lang() }}
              </p>
              <p class="mt-2 text-3xl font-bold tracking-tight text-codexa-cyan">
                {{ result().speedup }}×
              </p>
              <p class="mt-1 text-sm text-codexa-secondary">
                {{ 'roi.vsDegreeHint' | t: lang() }}
              </p>
            </cx-card>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class RoiCalculatorComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly roles: { id: Role; labelKey: string }[] = [
    { id: 'fullstack', labelKey: 'roi.role.fullstack' },
    { id: 'backend', labelKey: 'roi.role.backend' },
    { id: 'devops', labelKey: 'roi.role.devops' },
  ];

  private readonly timelines: Timeline[] = [3, 6, 12];

  protected readonly role = signal<Role>('fullstack');
  protected readonly timeline = signal<Timeline>(6);
  protected readonly timelineIndex = computed(() =>
    this.timelines.indexOf(this.timeline()),
  );

  private readonly baseSalaries: Record<Role, number> = {
    fullstack: 42000,
    backend: 45000,
    devops: 48000,
  };

  protected readonly result = computed(() => {
    const base = this.baseSalaries[this.role()];
    const months = this.timeline();
    const readiness = months === 3 ? 0.82 : months === 6 ? 1 : 1.12;
    const entry = Math.round((base * readiness) / 1000) * 1000;
    const growth = months === 3 ? 18 : months === 6 ? 32 : 48;
    const speedup = Math.round((48 / months) * 10) / 10;
    return { entry, growth, speedup };
  });

  onTimelineInput(event: Event): void {
    const idx = Number((event.target as HTMLInputElement).value);
    this.timeline.set(this.timelines[idx] ?? 6);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat(this.lang() === 'ar' ? 'ar' : 'en', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }
}

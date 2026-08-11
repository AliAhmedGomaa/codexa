import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { CardComponent } from '../../../../shared/ui/card/card.component';

interface Metric {
  id: string;
  valueKey: string;
  labelKey: string;
  target: number;
  prefix?: string;
  suffix?: string;
  display?: 'number' | 'ratio' | 'text';
  staticText?: string;
}

@Component({
  selector: 'cx-transparency-metrics',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section
      id="metrics"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="metrics-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center" cxReveal>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-emerald">
            {{ 'metrics.eyebrow' | t: lang() }}
          </p>
          <h2
            id="metrics-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'metrics.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'metrics.subtitle' | t: lang() }}
          </p>
        </div>

        <div
          class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          cxReveal
          #metricsRoot
        >
          @for (metric of metrics; track metric.id; let i = $index) {
            <cx-card [interactive]="false" class="text-center">
              <p
                class="font-mono text-3xl font-bold tracking-tight text-codexa-electric sm:text-4xl"
                [attr.aria-label]="metric.labelKey | t: lang()"
              >
                @if (metric.display === 'text') {
                  {{ metric.staticText }}
                } @else if (metric.display === 'ratio') {
                  {{ metric.staticText }}
                } @else {
                  {{ metric.prefix || '' }}{{ displayed()[metric.id] || 0 }}{{ metric.suffix || '' }}
                }
              </p>
              <p class="mt-3 text-sm text-codexa-secondary">
                {{ metric.labelKey | t: lang() }}
              </p>
            </cx-card>
          }
        </div>
      </div>
    </section>
  `,
})
export class TransparencyMetricsComponent implements AfterViewInit, OnDestroy {
  private readonly i18n = inject(I18nService);
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly lang = this.i18n.lang;

  protected readonly metrics: Metric[] = [
    {
      id: 'coverage',
      valueKey: '100',
      labelKey: 'metrics.coverage',
      target: 100,
      suffix: '%',
    },
    {
      id: 'mentor',
      valueKey: '1:1',
      labelKey: 'metrics.mentor',
      target: 1,
      display: 'ratio',
      staticText: '1:1',
    },
    {
      id: 'commits',
      valueKey: '240',
      labelKey: 'metrics.commits',
      target: 240,
      suffix: '+',
    },
    {
      id: 'response',
      valueKey: '15',
      labelKey: 'metrics.response',
      target: 15,
      prefix: '< ',
      suffix: ' min',
    },
  ];

  protected readonly displayed = signal<Record<string, number>>({
    coverage: 0,
    commits: 0,
    response: 0,
  });

  private observer?: IntersectionObserver;
  private animated = false;
  private raf = 0;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.snapToEnd();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.animateCounters();
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
  }

  private snapToEnd(): void {
    this.displayed.set({ coverage: 100, commits: 240, response: 15 });
  }

  private animateCounters(): void {
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      this.displayed.set({
        coverage: Math.round(100 * ease),
        commits: Math.round(240 * ease),
        response: Math.round(15 * ease),
      });
      if (t < 1) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
}

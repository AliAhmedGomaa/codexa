import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucideCheck } from '@lucide/angular';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';

type BillingPeriod = 'term' | 'monthly';

@Component({
  selector: 'cx-pricing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    LucideCheck,
    TranslatePipe,
    RevealOnScrollDirective,
  ],
  template: `
    <section
      id="pricing"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="pricing-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center" cxReveal>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-cyan">
            {{ 'pricing.eyebrow' | t: lang() }}
          </p>
          <h2
            id="pricing-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'pricing.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'pricing.subtitle' | t: lang() }}
          </p>

          <div
            class="mt-8 inline-flex items-center gap-1 rounded-codexa border border-codexa-border bg-codexa-surface p-1"
            role="group"
            [attr.aria-label]="'pricing.billingLabel' | t: lang()"
          >
            <button
              type="button"
              class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              [class.bg-codexa-electric]="billing() === 'term'"
              [class.text-white]="billing() === 'term'"
              [class.text-codexa-secondary]="billing() !== 'term'"
              [attr.aria-pressed]="billing() === 'term'"
              (click)="billing.set('term')"
            >
              {{ 'pricing.term' | t: lang() }}
            </button>
            <button
              type="button"
              class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              [class.bg-codexa-electric]="billing() === 'monthly'"
              [class.text-white]="billing() === 'monthly'"
              [class.text-codexa-secondary]="billing() !== 'monthly'"
              [attr.aria-pressed]="billing() === 'monthly'"
              (click)="billing.set('monthly')"
            >
              {{ 'pricing.monthly' | t: lang() }}
            </button>
          </div>
        </div>

        <div id="programs" class="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          @for (plan of plans(); track plan.id; let i = $index) {
            <div
              class="relative rounded-codexa"
              cxReveal
              [cxRevealDelay]="i * 100 + 'ms'"
              [class.glow-primary]="plan.featured"
              [class.p-px]="plan.featured"
              [class.bg-gradient-to-br]="plan.featured"
              [class.from-codexa-electric]="plan.featured"
              [class.via-codexa-cyan/40]="plan.featured"
              [class.to-codexa-electric/30]="plan.featured"
            >
              <cx-card class="h-full" [interactive]="false" padding="lg">
                @if (plan.featured) {
                  <div class="mb-4">
                    <cx-badge variant="electric">
                      {{ 'pricing.popular' | t: lang() }}
                    </cx-badge>
                  </div>
                }

                <h3 class="text-xl font-semibold text-codexa-primary">
                  {{ plan.nameKey | t: lang() }}
                </h3>
                <p class="mt-2 text-sm text-codexa-secondary">
                  {{ plan.blurbKey | t: lang() }}
                </p>

                <p class="mt-6 flex items-baseline gap-1">
                  <span class="text-4xl font-bold tracking-tight text-codexa-primary">
                    {{ priceFor(plan) }}
                  </span>
                  <span class="font-mono text-sm text-codexa-muted">
                    {{
                      (billing() === 'term'
                        ? 'pricing.suffixTerm'
                        : 'pricing.suffixMonthly'
                      ) | t: lang()
                    }}
                  </span>
                </p>

                <ul class="mt-6 space-y-3">
                  @for (featureKey of plan.featureKeys; track featureKey) {
                    <li class="flex gap-2 text-sm text-codexa-secondary">
                      <svg
                        lucideCheck
                        class="mt-0.5 shrink-0 text-codexa-emerald"
                        [size]="16"
                      ></svg>
                      <span>{{ featureKey | t: lang() }}</span>
                    </li>
                  }
                </ul>

                <div class="mt-8">
                  <cx-button
                    [variant]="plan.featured ? 'primary' : 'secondary'"
                    size="lg"
                    [fullWidth]="true"
                  >
                    {{ plan.ctaKey | t: lang() }}
                  </cx-button>
                </div>
              </cx-card>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class PricingComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;
  protected readonly billing = signal<BillingPeriod>('term');

  protected readonly plans = computed(() => [
    {
      id: 'core',
      nameKey: 'pricing.core.name',
      blurbKey: 'pricing.core.blurb',
      featured: false,
      termPrice: '$2,400',
      monthlyPrice: '$450',
      ctaKey: 'pricing.core.cta',
      featureKeys: [
        'pricing.core.f1',
        'pricing.core.f2',
        'pricing.core.f3',
        'pricing.core.f4',
        'pricing.core.f5',
      ],
    },
    {
      id: 'elite',
      nameKey: 'pricing.elite.name',
      blurbKey: 'pricing.elite.blurb',
      featured: true,
      termPrice: '$4,800',
      monthlyPrice: '$850',
      ctaKey: 'pricing.elite.cta',
      featureKeys: [
        'pricing.elite.f1',
        'pricing.elite.f2',
        'pricing.elite.f3',
        'pricing.elite.f4',
        'pricing.elite.f5',
      ],
    },
  ]);

  protected priceFor(plan: {
    termPrice: string;
    monthlyPrice: string;
  }): string {
    return this.billing() === 'term' ? plan.termPrice : plan.monthlyPrice;
  }
}

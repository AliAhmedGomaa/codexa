import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { LucideCheck } from '@lucide/angular';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';

type BillingPeriod = 'term' | 'monthly';

interface Plan {
  id: string;
  name: string;
  blurb: string;
  featured: boolean;
  termPrice: string;
  monthlyPrice: string;
  features: string[];
  cta: string;
}

@Component({
  selector: 'cx-pricing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, ButtonComponent, BadgeComponent, LucideCheck],
  template: `
    <section
      id="pricing"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="pricing-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-cyan">
            Enrollment
          </p>
          <h2
            id="pricing-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            Choose your intensity
          </h2>
          <p class="mt-4 text-codexa-secondary">
            Same production curriculum. Elite adds mentorship density and career
            acceleration.
          </p>

          <!-- Billing toggle -->
          <div
            class="mt-8 inline-flex items-center gap-1 rounded-codexa border border-codexa-border bg-codexa-surface p-1"
            role="group"
            aria-label="Billing period"
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
              Full term
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
              Monthly
            </button>
          </div>
        </div>

        <div
          id="programs"
          class="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2"
        >
          @for (plan of plans; track plan.id) {
            <div
              class="relative rounded-codexa"
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
                    <cx-badge variant="electric">Most popular</cx-badge>
                  </div>
                }

                <h3 class="text-xl font-semibold text-codexa-primary">
                  {{ plan.name }}
                </h3>
                <p class="mt-2 text-sm text-codexa-secondary">{{ plan.blurb }}</p>

                <p class="mt-6 flex items-baseline gap-1">
                  <span class="text-4xl font-bold tracking-tight text-codexa-primary">
                    {{ priceFor(plan) }}
                  </span>
                  <span class="font-mono text-sm text-codexa-muted">
                    {{ priceSuffix() }}
                  </span>
                </p>

                <ul class="mt-6 space-y-3">
                  @for (feature of plan.features; track feature) {
                    <li class="flex gap-2 text-sm text-codexa-secondary">
                      <svg
                        lucideCheck
                        class="mt-0.5 shrink-0 text-codexa-emerald"
                        [size]="16"
                      ></svg>
                      <span>{{ feature }}</span>
                    </li>
                  }
                </ul>

                <div class="mt-8">
                  <cx-button
                    [variant]="plan.featured ? 'primary' : 'secondary'"
                    size="lg"
                    [fullWidth]="true"
                  >
                    {{ plan.cta }}
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
  protected readonly billing = signal<BillingPeriod>('term');

  protected readonly priceSuffix = computed(() =>
    this.billing() === 'term' ? '/ term' : '/ mo',
  );

  protected readonly plans: Plan[] = [
    {
      id: 'core',
      name: 'Core Bootcamp',
      blurb: 'Focused curriculum, peer reviews, and portfolio-ready projects.',
      featured: false,
      termPrice: '$2,400',
      monthlyPrice: '$450',
      cta: 'Join Core',
      features: [
        'Full production curriculum',
        'Peer code reviews',
        'Portfolio project labs',
        'Community Discord access',
        'Career resource library',
      ],
    },
    {
      id: 'elite',
      name: 'Elite Track',
      blurb:
        '1-on-1 mentorship, live architecture labs, and priority career support.',
      featured: true,
      termPrice: '$4,800',
      monthlyPrice: '$850',
      cta: 'Enroll in Elite',
      features: [
        'Everything in Core',
        'Weekly 1-on-1 mentorship',
        'Priority code reviews',
        'Live architecture labs',
        'Career coaching & mock interviews',
      ],
    },
  ];

  protected priceFor(plan: Plan): string {
    return this.billing() === 'term' ? plan.termPrice : plan.monthlyPrice;
  }
}

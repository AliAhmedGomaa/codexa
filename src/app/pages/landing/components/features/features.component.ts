import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  LucideBoxes,
  LucideBrain,
  LucideBriefcase,
  LucideGitBranch,
  LucideRocket,
  LucideUsers,
} from '@lucide/angular';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'cx-features',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    BadgeComponent,
    TranslatePipe,
    LucideRocket,
    LucideGitBranch,
    LucideBrain,
    LucideUsers,
    LucideBoxes,
    LucideBriefcase,
  ],
  template: `
    <section
      id="features"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="features-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-cyan">
            {{ 'features.eyebrow' | t: lang() }}
          </p>
          <h2
            id="features-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'features.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'features.subtitle' | t: lang() }}
          </p>
        </div>

        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (feature of features(); track feature.titleKey) {
            <cx-card class="h-full">
              <div
                class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-codexa border border-codexa-border bg-codexa-obsidian"
                [class.text-codexa-cyan]="feature.accent === 'cyan'"
                [class.text-codexa-emerald]="feature.accent === 'emerald'"
                [class.text-codexa-electric]="feature.accent === 'electric'"
              >
                @switch (feature.icon) {
                  @case ('rocket') {
                    <svg lucideRocket [size]="20"></svg>
                  }
                  @case ('git') {
                    <svg lucideGitBranch [size]="20"></svg>
                  }
                  @case ('brain') {
                    <svg lucideBrain [size]="20"></svg>
                  }
                  @case ('users') {
                    <svg lucideUsers [size]="20"></svg>
                  }
                  @case ('boxes') {
                    <svg lucideBoxes [size]="20"></svg>
                  }
                  @case ('briefcase') {
                    <svg lucideBriefcase [size]="20"></svg>
                  }
                }
              </div>

              <h3 class="text-lg font-semibold text-codexa-primary">
                {{ feature.titleKey | t: lang() }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-codexa-secondary">
                {{ feature.descKey | t: lang() }}
              </p>
              <div class="mt-4">
                <cx-badge [variant]="feature.accent">
                  {{ feature.stackKey | t: lang() }}
                </cx-badge>
              </div>
            </cx-card>
          }
        </div>
      </div>
    </section>
  `,
})
export class FeaturesComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly features = computed(() => [
    {
      titleKey: 'features.f1.title',
      descKey: 'features.f1.desc',
      stackKey: 'features.f1.stack',
      icon: 'rocket' as const,
      accent: 'electric' as const,
    },
    {
      titleKey: 'features.f2.title',
      descKey: 'features.f2.desc',
      stackKey: 'features.f2.stack',
      icon: 'git' as const,
      accent: 'cyan' as const,
    },
    {
      titleKey: 'features.f3.title',
      descKey: 'features.f3.desc',
      stackKey: 'features.f3.stack',
      icon: 'brain' as const,
      accent: 'emerald' as const,
    },
    {
      titleKey: 'features.f4.title',
      descKey: 'features.f4.desc',
      stackKey: 'features.f4.stack',
      icon: 'users' as const,
      accent: 'electric' as const,
    },
    {
      titleKey: 'features.f5.title',
      descKey: 'features.f5.desc',
      stackKey: 'features.f5.stack',
      icon: 'boxes' as const,
      accent: 'cyan' as const,
    },
    {
      titleKey: 'features.f6.title',
      descKey: 'features.f6.desc',
      stackKey: 'features.f6.stack',
      icon: 'briefcase' as const,
      accent: 'emerald' as const,
    },
  ]);
}

import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  LucideBoxes,
  LucideBrain,
  LucideGitBranch,
  LucideRocket,
  LucideUsers,
  LucideBriefcase,
} from '@lucide/angular';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';

interface Feature {
  title: string;
  description: string;
  stack?: string;
  icon: 'rocket' | 'git' | 'brain' | 'users' | 'boxes' | 'briefcase';
  accent: 'electric' | 'cyan' | 'emerald';
}

@Component({
  selector: 'cx-features',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    BadgeComponent,
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
            Why Codexa
          </p>
          <h2
            id="features-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            Built like a real engineering org
          </h2>
          <p class="mt-4 text-codexa-secondary">
            Every module mirrors how modern teams design, ship, and review software —
            not toy tutorials.
          </p>
        </div>

        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (feature of features; track feature.title) {
            <cx-card class="h-full">
              <div
                class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-codexa border border-codexa-border bg-codexa-obsidian text-codexa-electric"
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
                {{ feature.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-codexa-secondary">
                {{ feature.description }}
              </p>

              @if (feature.stack) {
                <div class="mt-4">
                  <cx-badge [variant]="feature.accent">{{ feature.stack }}</cx-badge>
                </div>
              }
            </cx-card>
          }
        </div>
      </div>
    </section>
  `,
})
export class FeaturesComponent {
  protected readonly features: Feature[] = [
    {
      title: 'Production Stack',
      description:
        'Ship with Angular, NestJS, TypeScript, MongoDB, and Docker — the same stack used in serious product teams.',
      stack: 'Angular · NestJS · TS',
      icon: 'rocket',
      accent: 'electric',
    },
    {
      title: 'Real Engineering',
      description:
        'Practice Git workflows, CI/CD pipelines, and Cursor-assisted AI development the way professionals do.',
      stack: 'Git · CI/CD · Cursor',
      icon: 'git',
      accent: 'cyan',
    },
    {
      title: 'System Design',
      description:
        'Learn architectural patterns, caching strategies, state management, and API design that scales.',
      stack: 'Architecture',
      icon: 'brain',
      accent: 'emerald',
    },
    {
      title: '1-on-1 Mentorship',
      description:
        'Direct code reviews and weekly technical office hours with engineers who ship for a living.',
      stack: 'Reviews · Office hours',
      icon: 'users',
      accent: 'electric',
    },
    {
      title: 'Portfolio Capstones',
      description:
        'Graduate with deployable projects — not homework repos — ready to show hiring managers.',
      stack: 'Ship · Deploy',
      icon: 'boxes',
      accent: 'cyan',
    },
    {
      title: 'Career Acceleration',
      description:
        'Interview drills, resume systems storytelling, and guidance on standing out as a junior engineer.',
      stack: 'Career track',
      icon: 'briefcase',
      accent: 'emerald',
    },
  ];
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucideExternalLink, LucideGitBranch } from '@lucide/angular';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';

type StackFilter = 'All' | 'Angular' | 'NestJS' | 'MongoDB' | 'Docker';

interface Project {
  id: string;
  titleKey: string;
  studentKey: string;
  descKey: string;
  stack: StackFilter[];
  live: string;
  github: string;
}

@Component({
  selector: 'cx-student-showcase',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    BadgeComponent,
    TranslatePipe,
    RevealOnScrollDirective,
    LucideExternalLink,
    LucideGitBranch,
  ],
  template: `
    <section
      id="showcase"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="showcase-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center" cxReveal>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-emerald">
            {{ 'showcase.eyebrow' | t: lang() }}
          </p>
          <h2
            id="showcase-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'showcase.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'showcase.subtitle' | t: lang() }}
          </p>
        </div>

        <div
          class="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          [attr.aria-label]="'showcase.filterLabel' | t: lang()"
          cxReveal
        >
          @for (filter of filters; track filter) {
            <button
              type="button"
              role="tab"
              class="rounded-md border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              [attr.aria-selected]="activeFilter() === filter"
              [class.border-codexa-electric]="activeFilter() === filter"
              [class.bg-codexa-electric/15]="activeFilter() === filter"
              [class.text-codexa-electric]="activeFilter() === filter"
              [class.border-codexa-border]="activeFilter() !== filter"
              [class.text-codexa-muted]="activeFilter() !== filter"
              (click)="activeFilter.set(filter)"
            >
              {{ filter }}
            </button>
          }
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (project of filtered(); track project.id; let i = $index) {
            <div
              class="h-full"
              cxReveal="scale"
              [cxRevealDelay]="i * 60 + 'ms'"
            >
              <cx-card class="flex h-full flex-col">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="text-lg font-semibold text-codexa-primary">
                      {{ project.titleKey | t: lang() }}
                    </h3>
                    <p class="mt-1 font-mono text-xs text-codexa-electric">
                      {{ project.studentKey | t: lang() }}
                    </p>
                  </div>
                </div>
                <p class="mt-3 flex-1 text-sm leading-relaxed text-codexa-secondary">
                  {{ project.descKey | t: lang() }}
                </p>
                <div class="mt-4 flex flex-wrap gap-1.5">
                  @for (tech of project.stack; track tech) {
                    <cx-badge variant="cyan">{{ tech }}</cx-badge>
                  }
                </div>
                <div class="mt-5 flex flex-wrap gap-2">
                  <a
                    [href]="project.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex h-9 items-center gap-1.5 rounded-codexa border border-codexa-border px-3 font-mono text-xs text-codexa-primary transition-colors hover:border-codexa-electric/40 hover:text-codexa-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                  >
                    <svg lucideExternalLink [size]="14"></svg>
                    {{ 'showcase.live' | t: lang() }}
                  </a>
                  <a
                    [href]="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex h-9 items-center gap-1.5 rounded-codexa border border-codexa-border px-3 font-mono text-xs text-codexa-primary transition-colors hover:border-codexa-electric/40 hover:text-codexa-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                  >
                    <svg lucideGitBranch [size]="14"></svg>
                    GitHub
                  </a>
                </div>
              </cx-card>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class StudentShowcaseComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly filters: StackFilter[] = [
    'All',
    'Angular',
    'NestJS',
    'MongoDB',
    'Docker',
  ];

  protected readonly activeFilter = signal<StackFilter>('All');

  private readonly projects: Project[] = [
    {
      id: 'pulse',
      titleKey: 'showcase.p1.title',
      studentKey: 'showcase.p1.student',
      descKey: 'showcase.p1.desc',
      stack: ['Angular', 'NestJS', 'MongoDB'],
      live: 'https://codexa-academy.vercel.app',
      github: 'https://github.com/AliAhmedGomaa/codexa',
    },
    {
      id: 'harbor',
      titleKey: 'showcase.p2.title',
      studentKey: 'showcase.p2.student',
      descKey: 'showcase.p2.desc',
      stack: ['NestJS', 'Docker', 'MongoDB'],
      live: 'https://codexa-academy.vercel.app',
      github: 'https://github.com/AliAhmedGomaa/codexa',
    },
    {
      id: 'signalboard',
      titleKey: 'showcase.p3.title',
      studentKey: 'showcase.p3.student',
      descKey: 'showcase.p3.desc',
      stack: ['Angular', 'Docker'],
      live: 'https://codexa-academy.vercel.app',
      github: 'https://github.com/AliAhmedGomaa/codexa',
    },
    {
      id: 'fleet',
      titleKey: 'showcase.p4.title',
      studentKey: 'showcase.p4.student',
      descKey: 'showcase.p4.desc',
      stack: ['NestJS', 'Docker'],
      live: 'https://codexa-academy.vercel.app',
      github: 'https://github.com/AliAhmedGomaa/codexa',
    },
    {
      id: 'ledger',
      titleKey: 'showcase.p5.title',
      studentKey: 'showcase.p5.student',
      descKey: 'showcase.p5.desc',
      stack: ['Angular', 'MongoDB'],
      live: 'https://codexa-academy.vercel.app',
      github: 'https://github.com/AliAhmedGomaa/codexa',
    },
    {
      id: 'orbit',
      titleKey: 'showcase.p6.title',
      studentKey: 'showcase.p6.student',
      descKey: 'showcase.p6.desc',
      stack: ['Angular', 'NestJS', 'Docker'],
      live: 'https://codexa-academy.vercel.app',
      github: 'https://github.com/AliAhmedGomaa/codexa',
    },
  ];

  protected readonly filtered = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.projects;
    return this.projects.filter((p) => p.stack.includes(filter));
  });
}

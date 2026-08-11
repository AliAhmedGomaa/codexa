import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';

interface Phase {
  phase: string;
  title: string;
  description: string;
  topics: string[];
}

@Component({
  selector: 'cx-curriculum',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent],
  template: `
    <section
      id="curriculum"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="curriculum-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-emerald">
            Curriculum pathway
          </p>
          <h2
            id="curriculum-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            From first commit to production deploy
          </h2>
          <p class="mt-4 text-codexa-secondary">
            A sequenced roadmap that compounds skills week over week — foundations,
            full-stack systems, infrastructure, then a shippable capstone.
          </p>
        </div>

        <ol class="relative mx-auto mt-14 max-w-3xl space-y-0">
          <!-- Spine -->
          <div
            class="absolute left-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-codexa-electric via-codexa-cyan to-codexa-emerald sm:left-[1.4rem]"
            aria-hidden="true"
          ></div>

          @for (phase of phases; track phase.phase; let i = $index) {
            <li class="relative flex gap-5 pb-10 last:pb-0 sm:gap-8">
              <div
                class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-codexa-border bg-codexa-obsidian font-mono text-xs font-semibold text-codexa-primary shadow-[0_0_20px_-4px_rgba(99,102,241,0.45)] sm:h-12 sm:w-12 sm:text-sm"
              >
                {{ i + 1 }}
              </div>

              <div
                class="glass-card flex-1 rounded-codexa border border-codexa-border p-5 transition-colors duration-200 hover:border-codexa-electric/30 sm:p-6"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <cx-badge
                    [variant]="i % 3 === 0 ? 'electric' : i % 3 === 1 ? 'cyan' : 'emerald'"
                  >
                    {{ phase.phase }}
                  </cx-badge>
                </div>
                <h3 class="mt-3 text-xl font-semibold text-codexa-primary">
                  {{ phase.title }}
                </h3>
                <p class="mt-2 text-sm leading-relaxed text-codexa-secondary">
                  {{ phase.description }}
                </p>
                <ul class="mt-4 flex flex-wrap gap-2">
                  @for (topic of phase.topics; track topic) {
                    <li
                      class="rounded-md bg-codexa-obsidian/80 px-2.5 py-1 font-mono text-[11px] text-codexa-muted ring-1 ring-inset ring-codexa-border"
                    >
                      {{ topic }}
                    </li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class CurriculumComponent {
  protected readonly phases: Phase[] = [
    {
      phase: 'Phase 1',
      title: 'Core Foundations & Modern TypeScript',
      description:
        'Type systems, async patterns, tooling, and engineering hygiene that every production codebase expects.',
      topics: ['TypeScript', 'Node tooling', 'Git fluency', 'Testing basics'],
    },
    {
      phase: 'Phase 2',
      title: 'Full-Stack Web Architecture',
      description:
        'Build end-to-end features with Angular on the client and NestJS on the server — signals, modules, and clean APIs.',
      topics: ['Angular', 'NestJS', 'REST/GraphQL', 'Auth'],
    },
    {
      phase: 'Phase 3',
      title: 'Databases, Microservices & Docker',
      description:
        'Model data, containerize services, and introduce distributed patterns without drowning in complexity.',
      topics: ['MongoDB / SQL', 'Docker', 'Caching', 'CI pipelines'],
    },
    {
      phase: 'Phase 4',
      title: 'Capstone Project & Production Deployment',
      description:
        'Ship a real product: observability, deploy targets, polish, and a portfolio narrative hiring managers trust.',
      topics: ['Capstone', 'Deploy', 'Observability', 'Demo day'],
    },
  ];
}

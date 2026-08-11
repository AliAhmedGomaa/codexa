import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';

@Component({
  selector: 'cx-curriculum',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, TranslatePipe],
  template: `
    <section
      id="curriculum"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="curriculum-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-emerald">
            {{ 'curriculum.eyebrow' | t: lang() }}
          </p>
          <h2
            id="curriculum-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'curriculum.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'curriculum.subtitle' | t: lang() }}
          </p>
        </div>

        <ol class="relative mx-auto mt-14 max-w-3xl space-y-0">
          <div
            class="absolute start-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-codexa-electric via-codexa-cyan to-codexa-emerald sm:start-[1.4rem]"
            aria-hidden="true"
          ></div>

          @for (phase of phases(); track phase.badgeKey; let i = $index) {
            <li class="relative flex gap-5 pb-10 last:pb-0 sm:gap-8">
              <div
                class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-codexa-border bg-codexa-obsidian font-mono text-xs font-semibold text-codexa-primary shadow-[0_0_20px_-4px_rgba(0,100,255,0.45)] sm:h-12 sm:w-12 sm:text-sm"
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
                    {{ phase.badgeKey | t: lang() }}
                  </cx-badge>
                </div>
                <h3 class="mt-3 text-xl font-semibold text-codexa-primary">
                  {{ phase.titleKey | t: lang() }}
                </h3>
                <p class="mt-2 text-sm leading-relaxed text-codexa-secondary">
                  {{ phase.descKey | t: lang() }}
                </p>
                <ul class="mt-4 flex flex-wrap gap-2">
                  @for (topicKey of phase.topicKeys; track topicKey) {
                    <li
                      class="rounded-md bg-codexa-obsidian/80 px-2.5 py-1 font-mono text-[11px] text-codexa-muted ring-1 ring-inset ring-codexa-border"
                    >
                      {{ topicKey | t: lang() }}
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
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly phases = computed(() => [
    {
      badgeKey: 'curriculum.p1.badge',
      titleKey: 'curriculum.p1.title',
      descKey: 'curriculum.p1.desc',
      topicKeys: [
        'curriculum.p1.t1',
        'curriculum.p1.t2',
        'curriculum.p1.t3',
        'curriculum.p1.t4',
      ],
    },
    {
      badgeKey: 'curriculum.p2.badge',
      titleKey: 'curriculum.p2.title',
      descKey: 'curriculum.p2.desc',
      topicKeys: [
        'curriculum.p2.t1',
        'curriculum.p2.t2',
        'curriculum.p2.t3',
        'curriculum.p2.t4',
      ],
    },
    {
      badgeKey: 'curriculum.p3.badge',
      titleKey: 'curriculum.p3.title',
      descKey: 'curriculum.p3.desc',
      topicKeys: [
        'curriculum.p3.t1',
        'curriculum.p3.t2',
        'curriculum.p3.t3',
        'curriculum.p3.t4',
      ],
    },
    {
      badgeKey: 'curriculum.p4.badge',
      titleKey: 'curriculum.p4.title',
      descKey: 'curriculum.p4.desc',
      topicKeys: [
        'curriculum.p4.t1',
        'curriculum.p4.t2',
        'curriculum.p4.t3',
        'curriculum.p4.t4',
      ],
    },
  ]);
}

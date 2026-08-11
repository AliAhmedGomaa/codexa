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

type Track = 'part' | 'full';

interface Block {
  key: string;
  hours: string;
  tone: 'electric' | 'cyan' | 'emerald' | 'muted';
}

@Component({
  selector: 'cx-schedule-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section
      id="schedule"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="schedule-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center" cxReveal>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-electric">
            {{ 'schedule.eyebrow' | t: lang() }}
          </p>
          <h2
            id="schedule-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'schedule.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'schedule.subtitle' | t: lang() }}
          </p>

          <div
            class="mt-8 inline-flex items-center gap-1 rounded-codexa border border-codexa-border bg-codexa-surface p-1"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              class="rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              [attr.aria-selected]="track() === 'part'"
              [class.bg-codexa-electric]="track() === 'part'"
              [class.text-white]="track() === 'part'"
              [class.text-codexa-secondary]="track() !== 'part'"
              (click)="track.set('part')"
            >
              {{ 'schedule.part' | t: lang() }}
            </button>
            <button
              type="button"
              role="tab"
              class="rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              [attr.aria-selected]="track() === 'full'"
              [class.bg-codexa-electric]="track() === 'full'"
              [class.text-white]="track() === 'full'"
              [class.text-codexa-secondary]="track() !== 'full'"
              (click)="track.set('full')"
            >
              {{ 'schedule.full' | t: lang() }}
            </button>
          </div>

          <p class="mt-4 font-mono text-sm text-codexa-cyan">
            {{ hoursLabel() | t: lang() }}
          </p>
        </div>

        <div class="mx-auto mt-12 max-w-3xl space-y-3" cxReveal>
          @for (block of blocks(); track block.key; let i = $index) {
            <cx-card [interactive]="false" class="!p-0 overflow-hidden">
              <div class="flex flex-col sm:flex-row sm:items-stretch">
                <div
                  class="flex items-center justify-center px-4 py-3 font-mono text-xs sm:w-28 sm:shrink-0"
                  [class.bg-codexa-electric/15]="block.tone === 'electric'"
                  [class.text-codexa-electric]="block.tone === 'electric'"
                  [class.bg-codexa-cyan/15]="block.tone === 'cyan'"
                  [class.text-codexa-cyan]="block.tone === 'cyan'"
                  [class.bg-codexa-emerald/15]="block.tone === 'emerald'"
                  [class.text-codexa-emerald]="block.tone === 'emerald'"
                  [class.bg-codexa-surface-hover]="block.tone === 'muted'"
                  [class.text-codexa-muted]="block.tone === 'muted'"
                >
                  {{ block.hours }}
                </div>
                <div class="flex-1 border-t border-codexa-border px-5 py-4 sm:border-s sm:border-t-0">
                  <p class="font-medium text-codexa-primary">
                    {{ block.key | t: lang() }}
                  </p>
                  <p class="mt-1 text-sm text-codexa-secondary">
                    {{ block.key + '.desc' | t: lang() }}
                  </p>
                </div>
              </div>
            </cx-card>
          }
        </div>
      </div>
    </section>
  `,
})
export class ScheduleToggleComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly track = signal<Track>('part');

  protected readonly hoursLabel = computed(() =>
    this.track() === 'part' ? 'schedule.partHours' : 'schedule.fullHours',
  );

  protected readonly blocks = computed<Block[]>(() => {
    if (this.track() === 'part') {
      return [
        {
          key: 'schedule.b.labs',
          hours: 'Mon 19–21',
          tone: 'electric',
        },
        {
          key: 'schedule.b.reviews',
          hours: 'Wed 20–21',
          tone: 'cyan',
        },
        {
          key: 'schedule.b.mentor',
          hours: 'Fri 18–19',
          tone: 'emerald',
        },
        {
          key: 'schedule.b.async',
          hours: 'Sat async',
          tone: 'muted',
        },
      ];
    }
    return [
      {
        key: 'schedule.b.labs',
        hours: '09:00–12:00',
        tone: 'electric',
      },
      {
        key: 'schedule.b.reviews',
        hours: '13:00–15:00',
        tone: 'cyan',
      },
      {
        key: 'schedule.b.mentor',
        hours: '15:30–16:30',
        tone: 'emerald',
      },
      {
        key: 'schedule.b.sync',
        hours: '17:00–18:00',
        tone: 'muted',
      },
    ];
  });
}

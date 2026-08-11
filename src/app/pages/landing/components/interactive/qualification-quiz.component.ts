import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { LucideArrowLeft, LucideArrowRight, LucideX } from '@lucide/angular';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { LandingModalsService } from '../../services/landing-modals.service';

type Step = 0 | 1 | 2 | 3 | 4;

@Component({
  selector: 'cx-qualification-quiz',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    TranslatePipe,
    RevealOnScrollDirective,
    LucideX,
    LucideArrowLeft,
    LucideArrowRight,
  ],
  template: `
    <section
      id="readiness"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="quiz-heading"
    >
      <div class="mx-auto max-w-2xl px-4 text-center sm:px-6" cxReveal>
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-electric">
          {{ 'quiz.eyebrow' | t: lang() }}
        </p>
        <h2
          id="quiz-heading"
          class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
        >
          {{ 'quiz.title' | t: lang() }}
        </h2>
        <p class="mt-4 text-codexa-secondary">
          {{ 'quiz.subtitle' | t: lang() }}
        </p>
        <div class="mt-8">
          <cx-button variant="terminal" size="lg" (click)="open()">
            {{ 'quiz.cta' | t: lang() }}
          </cx-button>
        </div>
      </div>
    </section>

    @if (modals.quizOpen()) {
      <div
        class="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
        role="presentation"
        (click)="onBackdrop($event)"
      >
        <div
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="'quiz-dialog-title'"
          class="glass-card w-full max-w-xl rounded-codexa border border-codexa-border p-6 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)]"
          (click)="$event.stopPropagation()"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3
                id="quiz-dialog-title"
                class="text-xl font-semibold text-codexa-primary"
              >
                {{ 'quiz.modalTitle' | t: lang() }}
              </h3>
              @if (step() < 4) {
                <p class="mt-1 font-mono text-xs text-codexa-muted">
                  {{ 'quiz.step' | t: lang() }} {{ step() + 1 }}/4
                </p>
              }
            </div>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-codexa-border text-codexa-muted transition-colors hover:text-codexa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              [attr.aria-label]="'quiz.close' | t: lang()"
              (click)="modals.closeQuiz()"
            >
              <svg lucideX [size]="18"></svg>
            </button>
          </div>

          @if (step() < 4) {
            <div
              class="mt-4 h-1 overflow-hidden rounded-full bg-codexa-border"
              aria-hidden="true"
            >
              <div
                class="h-full bg-codexa-electric transition-all duration-300"
                [style.width.%]="((step() + 1) / 4) * 100"
              ></div>
            </div>

            <p class="mt-6 text-base font-medium text-codexa-primary">
              {{ questionKey() | t: lang() }}
            </p>

            <div class="mt-4 space-y-2" role="radiogroup">
              @for (opt of options(); track opt.id) {
                <button
                  type="button"
                  role="radio"
                  class="flex w-full items-start rounded-codexa border px-4 py-3 text-start text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                  [attr.aria-checked]="answers()[step()] === opt.id"
                  [class.border-codexa-electric]="answers()[step()] === opt.id"
                  [class.bg-codexa-electric/10]="answers()[step()] === opt.id"
                  [class.text-codexa-primary]="answers()[step()] === opt.id"
                  [class.border-codexa-border]="answers()[step()] !== opt.id"
                  [class.text-codexa-secondary]="answers()[step()] !== opt.id"
                  (click)="select(opt.id)"
                >
                  {{ opt.labelKey | t: lang() }}
                </button>
              }
            </div>

            <div class="mt-6 flex justify-between gap-3">
              <cx-button
                variant="secondary"
                [disabled]="step() === 0"
                (click)="back()"
              >
                <svg lucideArrowLeft [size]="16"></svg>
                {{ 'quiz.back' | t: lang() }}
              </cx-button>
              <cx-button
                variant="primary"
                [disabled]="!answers()[step()]"
                (click)="next()"
              >
                {{ step() === 3 ? ('quiz.finish' | t: lang()) : ('quiz.next' | t: lang()) }}
                <svg lucideArrowRight [size]="16"></svg>
              </cx-button>
            </div>
          } @else {
            <div class="mt-6 rounded-codexa border border-codexa-electric/30 bg-codexa-electric/10 p-5">
              <p class="font-mono text-xs uppercase tracking-wider text-codexa-electric">
                {{ 'quiz.resultLabel' | t: lang() }}
              </p>
              <h4 class="mt-2 text-2xl font-bold text-codexa-primary">
                {{ recommendation() | t: lang() }}
              </h4>
              <p class="mt-3 text-sm text-codexa-secondary">
                {{ recommendationBody() | t: lang() }}
              </p>
            </div>
            <div class="mt-6 flex flex-wrap gap-3">
              <cx-button variant="primary" (click)="scrollEnroll()">
                {{ 'quiz.enroll' | t: lang() }}
              </cx-button>
              <cx-button variant="secondary" (click)="restart()">
                {{ 'quiz.restart' | t: lang() }}
              </cx-button>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class QualificationQuizComponent {
  private readonly i18n = inject(I18nService);
  protected readonly modals = inject(LandingModalsService);
  protected readonly lang = this.i18n.lang;

  protected readonly step = signal<Step>(0);
  protected readonly answers = signal<Record<number, string>>({});

  private readonly questionKeys = [
    'quiz.q1',
    'quiz.q2',
    'quiz.q3',
    'quiz.q4',
  ] as const;

  private readonly optionSets: { id: string; labelKey: string; score: number }[][] =
    [
      [
        { id: 'none', labelKey: 'quiz.q1.a', score: 1 },
        { id: 'basics', labelKey: 'quiz.q1.b', score: 2 },
        { id: 'shipped', labelKey: 'quiz.q1.c', score: 3 },
      ],
      [
        { id: 'lt10', labelKey: 'quiz.q2.a', score: 1 },
        { id: '15', labelKey: 'quiz.q2.b', score: 2 },
        { id: '40', labelKey: 'quiz.q2.c', score: 3 },
      ],
      [
        { id: 'job', labelKey: 'quiz.q3.a', score: 2 },
        { id: 'switch', labelKey: 'quiz.q3.b', score: 2 },
        { id: 'startup', labelKey: 'quiz.q3.c', score: 3 },
      ],
      [
        { id: 'async', labelKey: 'quiz.q4.a', score: 1 },
        { id: 'live', labelKey: 'quiz.q4.b', score: 2 },
        { id: 'mentor', labelKey: 'quiz.q4.c', score: 3 },
      ],
    ];

  protected readonly questionKey = computed(() => {
    const s = this.step() as number;
    if (s === 0) return 'quiz.q1';
    if (s === 1) return 'quiz.q2';
    if (s === 2) return 'quiz.q3';
    if (s === 3) return 'quiz.q4';
    return 'quiz.q1';
  });

  protected readonly options = computed(() => {
    const s = this.step() as number;
    if (s >= 0 && s < 4) return this.optionSets[s]!;
    return [];
  });

  protected readonly recommendation = computed(() =>
    this.totalScore() >= 9 ? 'quiz.rec.elite' : 'quiz.rec.core',
  );

  protected readonly recommendationBody = computed(() =>
    this.totalScore() >= 9 ? 'quiz.rec.eliteBody' : 'quiz.rec.coreBody',
  );

  constructor() {
    effect(() => {
      if (!this.modals.quizOpen()) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this.modals.closeQuiz();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    });
  }

  private totalScore(): number {
    let score = 0;
    for (let i = 0; i < 4; i++) {
      const id = this.answers()[i];
      const opt = this.optionSets[i]?.find((o) => o.id === id);
      score += opt?.score ?? 0;
    }
    return score;
  }

  open(): void {
    this.restart();
    this.modals.openQuiz();
  }

  select(id: string): void {
    this.answers.update((a) => ({ ...a, [this.step()]: id }));
  }

  next(): void {
    if (!this.answers()[this.step()]) return;
    if (this.step() === 3) {
      this.step.set(4);
      return;
    }
    this.step.set((this.step() + 1) as Step);
  }

  back(): void {
    if (this.step() === 0) return;
    this.step.set((this.step() - 1) as Step);
  }

  restart(): void {
    this.step.set(0);
    this.answers.set({});
  }

  scrollEnroll(): void {
    this.modals.closeQuiz();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.modals.closeQuiz();
    }
  }
}

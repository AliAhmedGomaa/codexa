import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { LucideDownload, LucideX } from '@lucide/angular';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { LandingModalsService } from '../../services/landing-modals.service';

type StackPref = 'fullstack' | 'backend' | 'devops';

@Component({
  selector: 'cx-syllabus-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    TranslatePipe,
    RevealOnScrollDirective,
    LucideDownload,
    LucideX,
  ],
  template: `
    <section
      id="syllabus"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="syllabus-heading"
    >
      <div class="mx-auto max-w-2xl px-4 text-center sm:px-6" cxReveal>
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-cyan">
          {{ 'syllabus.eyebrow' | t: lang() }}
        </p>
        <h2
          id="syllabus-heading"
          class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
        >
          {{ 'syllabus.title' | t: lang() }}
        </h2>
        <p class="mt-4 text-codexa-secondary">
          {{ 'syllabus.subtitle' | t: lang() }}
        </p>
        <div class="mt-8">
          <cx-button variant="primary" size="lg" (click)="modals.openSyllabus()">
            <svg lucideDownload [size]="18"></svg>
            {{ 'syllabus.cta' | t: lang() }}
          </cx-button>
        </div>
      </div>
    </section>

    @if (modals.syllabusOpen()) {
      <div
        class="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
        role="presentation"
        (click)="onBackdrop($event)"
      >
        <div
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="'syllabus-dialog-title'"
          class="glass-card w-full max-w-lg rounded-codexa border border-codexa-border p-6 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)]"
          (click)="$event.stopPropagation()"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3
                id="syllabus-dialog-title"
                class="text-xl font-semibold text-codexa-primary"
              >
                {{ 'syllabus.modalTitle' | t: lang() }}
              </h3>
              <p class="mt-1 text-sm text-codexa-secondary">
                {{ 'syllabus.modalSubtitle' | t: lang() }}
              </p>
            </div>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-codexa-border text-codexa-muted transition-colors hover:text-codexa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              [attr.aria-label]="'syllabus.close' | t: lang()"
              (click)="modals.closeSyllabus()"
            >
              <svg lucideX [size]="18"></svg>
            </button>
          </div>

          @if (!submitted()) {
            <form class="mt-6 space-y-4" (submit)="onSubmit($event)">
              <div>
                <label
                  for="syllabus-name"
                  class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-codexa-muted"
                >
                  {{ 'syllabus.name' | t: lang() }}
                </label>
                <input
                  id="syllabus-name"
                  name="name"
                  required
                  autocomplete="name"
                  class="h-11 w-full rounded-codexa border border-codexa-border bg-codexa-obsidian px-3 text-sm text-codexa-primary placeholder:text-codexa-muted focus:border-codexa-electric/50 focus:outline-none focus:ring-2 focus:ring-codexa-electric/30"
                  [placeholder]="'syllabus.namePh' | t: lang()"
                  [value]="name()"
                  (input)="name.set($any($event.target).value)"
                />
              </div>
              <div>
                <label
                  for="syllabus-email"
                  class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-codexa-muted"
                >
                  {{ 'syllabus.email' | t: lang() }}
                </label>
                <input
                  id="syllabus-email"
                  name="email"
                  type="email"
                  required
                  autocomplete="email"
                  class="h-11 w-full rounded-codexa border border-codexa-border bg-codexa-obsidian px-3 text-sm text-codexa-primary placeholder:text-codexa-muted focus:border-codexa-electric/50 focus:outline-none focus:ring-2 focus:ring-codexa-electric/30"
                  [placeholder]="'syllabus.emailPh' | t: lang()"
                  [value]="email()"
                  (input)="email.set($any($event.target).value)"
                />
              </div>
              <div>
                <label
                  for="syllabus-stack"
                  class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-codexa-muted"
                >
                  {{ 'syllabus.stack' | t: lang() }}
                </label>
                <select
                  id="syllabus-stack"
                  name="stack"
                  class="h-11 w-full rounded-codexa border border-codexa-border bg-codexa-obsidian px-3 text-sm text-codexa-primary focus:border-codexa-electric/50 focus:outline-none focus:ring-2 focus:ring-codexa-electric/30"
                  [value]="stack()"
                  (change)="stack.set($any($event.target).value)"
                >
                  <option value="fullstack">
                    {{ 'roi.role.fullstack' | t: lang() }}
                  </option>
                  <option value="backend">
                    {{ 'roi.role.backend' | t: lang() }}
                  </option>
                  <option value="devops">
                    {{ 'roi.role.devops' | t: lang() }}
                  </option>
                </select>
              </div>
              <cx-button type="submit" variant="primary" [fullWidth]="true">
                {{ 'syllabus.submit' | t: lang() }}
              </cx-button>
            </form>
          } @else {
            <div
              dir="ltr"
              class="mt-6 rounded-codexa border border-codexa-border bg-codexa-obsidian p-4 font-mono text-sm [direction:ltr]"
              role="status"
            >
              <p class="text-codexa-muted">$ codexa download --curriculum</p>
              <p class="mt-2 text-codexa-emerald">✔ Package ready</p>
              <a
                href="/docs/codexa-curriculum-2026.pdf"
                download="codexa-curriculum-2026.pdf"
                class="mt-3 inline-flex items-center gap-2 text-codexa-electric underline-offset-4 hover:underline"
              >
                ↓ codexa-curriculum-2026.pdf
              </a>
              <p class="mt-3 text-xs text-codexa-secondary">
                {{ 'syllabus.thanks' | t: lang() }}
              </p>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class SyllabusModalComponent {
  private readonly i18n = inject(I18nService);
  protected readonly modals = inject(LandingModalsService);
  protected readonly lang = this.i18n.lang;

  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly stack = signal<StackPref>('fullstack');
  protected readonly submitted = signal(false);

  constructor() {
    effect(() => {
      if (!this.modals.syllabusOpen()) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this.modals.closeSyllabus();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    });
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.modals.closeSyllabus();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.name().trim() || !this.email().trim()) return;
    this.submitted.set(true);
  }
}

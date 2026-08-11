import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SOCIAL_LINKS } from '../../../../core/config/social.links';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { BrandLogoComponent } from '../../../../shared/ui/brand-logo/brand-logo.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'cx-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    BrandLogoComponent,
    TranslatePipe,
    RevealOnScrollDirective,
  ],
  template: `
    <section
      id="join"
      class="scroll-mt-header relative overflow-hidden border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="cta-heading"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(0,100,255,0.18),transparent_60%)]"
        aria-hidden="true"
      ></div>

      <div class="relative mx-auto max-w-2xl px-4 text-center sm:px-6" cxReveal>
        <h2
          id="cta-heading"
          class="text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
        >
          {{ 'cta.title' | t: lang() }}
        </h2>
        <p class="mt-4 text-codexa-secondary">
          {{ 'cta.subtitle' | t: lang() }}
        </p>

        <form
          class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          (submit)="onSubmit($event)"
        >
          <label class="sr-only" for="cta-email">{{ 'cta.email' | t: lang() }}</label>
          <input
            id="cta-email"
            type="email"
            name="email"
            required
            autocomplete="email"
            [placeholder]="'cta.placeholder' | t: lang()"
            class="h-12 flex-1 rounded-codexa border border-codexa-border bg-codexa-surface px-4 text-sm text-codexa-primary placeholder:text-codexa-muted transition-colors focus:border-codexa-electric/50 focus:outline-none focus:ring-2 focus:ring-codexa-electric/30"
            [value]="email()"
            (input)="email.set($any($event.target).value)"
          />
          <cx-button variant="primary" size="lg" type="submit">
            {{ 'cta.submit' | t: lang() }}
          </cx-button>
        </form>

        @if (submitted()) {
          <p class="mt-4 font-mono text-sm text-codexa-emerald" role="status">
            {{ 'cta.success' | t: lang() }}
          </p>
        }
      </div>
    </section>

    <footer class="bg-codexa-obsidian py-12 sm:py-14">
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div class="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              class="inline-flex h-10 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
              (click)="scrollTop($event)"
            >
              <cx-brand-logo imgClass="h-9" />
            </a>
            <p class="mt-3 max-w-xs text-sm text-codexa-muted">
              {{ 'footer.tagline' | t: lang() }}
            </p>
            <div class="mt-5 flex gap-3">
              @for (social of socials; track social.id) {
                <a
                  [href]="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="social.labelKey | t: lang()"
                  class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-codexa-border text-codexa-muted transition-colors hover:border-codexa-electric/40 hover:text-codexa-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                >
                  @switch (social.id) {
                    @case ('github') {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path
                          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                        />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    }
                    @case ('linkedin') {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path
                          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                        />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    }
                    @case ('x') {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 4l11.733 16H20L8.267 4z" />
                        <path d="M20 4L8.267 20" />
                      </svg>
                    }
                    @case ('youtube') {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
                        />
                        <path d="m10 15 5-3-5-3z" />
                      </svg>
                    }
                  }
                </a>
              }
            </div>
          </div>

          @for (group of linkGroups(); track group.titleKey) {
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.16em] text-codexa-muted">
                {{ group.titleKey | t: lang() }}
              </p>
              <ul class="mt-4 space-y-2">
                @for (link of group.links; track link.labelKey) {
                  <li>
                    <a
                      [href]="link.href"
                      class="text-sm text-codexa-secondary transition-colors hover:text-codexa-primary"
                    >
                      {{ link.labelKey | t: lang() }}
                    </a>
                  </li>
                }
              </ul>
            </div>
          }
        </div>

        <div
          class="mt-12 flex flex-col gap-3 border-t border-codexa-border pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="font-mono text-xs text-codexa-muted">
            {{ 'footer.ready' | t: lang() }}
          </p>
          <p class="text-xs text-codexa-muted">
            {{ 'footer.copyright' | t: lang() : copyrightParams() }}
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;
  protected readonly email = signal('');
  protected readonly submitted = signal(false);
  protected readonly year = new Date().getFullYear();
  protected readonly copyrightParams = computed(() => ({ year: this.year }));

  protected readonly socials = [
    {
      id: 'github' as const,
      labelKey: 'footer.github',
      href: SOCIAL_LINKS.github,
    },
    {
      id: 'linkedin' as const,
      labelKey: 'footer.linkedin',
      href: SOCIAL_LINKS.linkedin,
    },
    {
      id: 'x' as const,
      labelKey: 'footer.x',
      href: SOCIAL_LINKS.x,
    },
    {
      id: 'youtube' as const,
      labelKey: 'footer.youtube',
      href: SOCIAL_LINKS.youtube,
    },
  ];

  protected readonly linkGroups = computed(() => [
    {
      titleKey: 'footer.learn',
      links: [
        { labelKey: 'nav.courses', href: '#features' },
        { labelKey: 'nav.methodology', href: '#methodology' },
        { labelKey: 'nav.curriculum', href: '#curriculum' },
        { labelKey: 'nav.pricing', href: '#pricing' },
      ],
    },
    {
      titleKey: 'footer.company',
      links: [
        { labelKey: 'footer.about', href: '#' },
        { labelKey: 'footer.careers', href: '#' },
        { labelKey: 'footer.contact', href: '#join' },
      ],
    },
    {
      titleKey: 'footer.legal',
      links: [
        { labelKey: 'footer.privacy', href: '#' },
        { labelKey: 'footer.terms', href: '#' },
        { labelKey: 'footer.cookies', href: '#' },
      ],
    },
  ]);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.email().trim()) return;
    this.submitted.set(true);
  }

  protected scrollTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

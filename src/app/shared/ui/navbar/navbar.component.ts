import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucideMenu, LucideMoon, LucideSun, LucideX } from '@lucide/angular';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { ThemeService } from '../../../core/theme/theme.service';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'cx-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    BrandLogoComponent,
    TranslatePipe,
    LucideMenu,
    LucideX,
    LucideSun,
    LucideMoon,
  ],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-[color:var(--cx-nav-border)] bg-codexa-obsidian/70 backdrop-blur-md"
    >
      <nav
        class="mx-auto flex h-16 max-w-wide items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
        [attr.aria-label]="'nav.primary' | t: lang()"
      >
        <a
          href="#"
          class="group inline-flex h-9 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50 sm:h-10"
          (click)="scrollTop($event)"
        >
          <cx-brand-logo imgClass="h-8 sm:h-9" />
        </a>

        <ul class="hidden items-center gap-1 lg:flex">
          @for (link of links(); track link.fragment) {
            <li>
              <a
                [href]="'#' + link.fragment"
                class="rounded-md px-3 py-2 text-sm font-medium text-codexa-secondary transition-colors duration-200 hover:bg-codexa-surface-hover/40 hover:text-codexa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                (click)="navigate($event, link.fragment)"
              >
                {{ link.labelKey | t: lang() }}
              </a>
            </li>
          }
        </ul>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="hidden h-9 items-center rounded-codexa border border-codexa-border px-2.5 font-mono text-xs font-medium text-codexa-secondary transition-colors hover:bg-codexa-surface-hover hover:text-codexa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50 sm:inline-flex"
            (click)="i18n.toggleLang()"
          >
            {{ 'nav.langSwitch' | t: lang() }}
          </button>

          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-codexa border border-codexa-border text-codexa-primary transition-colors hover:bg-codexa-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
            [attr.aria-label]="
              (theme.theme() === 'dark' ? 'nav.themeLight' : 'nav.themeDark') | t: lang()
            "
            (click)="theme.toggle()"
          >
            @if (theme.theme() === 'dark') {
              <svg lucideSun [size]="16"></svg>
            } @else {
              <svg lucideMoon [size]="16"></svg>
            }
          </button>

          <div class="hidden md:block">
            <cx-button variant="primary" size="md" (click)="navigate($event, 'pricing')">
              {{ 'nav.enroll' | t: lang() }}
            </cx-button>
          </div>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-codexa border border-codexa-border text-codexa-primary transition-colors hover:bg-codexa-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50 lg:hidden"
            [attr.aria-expanded]="mobileOpen()"
            aria-controls="mobile-nav"
            (click)="toggleMobile()"
          >
            @if (mobileOpen()) {
              <svg lucideX [size]="20"></svg>
              <span class="sr-only">{{ 'nav.closeMenu' | t: lang() }}</span>
            } @else {
              <svg lucideMenu [size]="20"></svg>
              <span class="sr-only">{{ 'nav.openMenu' | t: lang() }}</span>
            }
          </button>
        </div>
      </nav>

      @if (mobileOpen()) {
        <div
          id="mobile-nav"
          class="border-t border-codexa-border bg-codexa-obsidian/95 px-4 py-4 backdrop-blur-md lg:hidden"
        >
          <ul class="flex flex-col gap-1">
            @for (link of links(); track link.fragment) {
              <li>
                <a
                  [href]="'#' + link.fragment"
                  class="block rounded-md px-3 py-2.5 text-sm font-medium text-codexa-secondary transition-colors hover:bg-codexa-surface-hover hover:text-codexa-primary"
                  (click)="navigate($event, link.fragment); closeMobile()"
                >
                  {{ link.labelKey | t: lang() }}
                </a>
              </li>
            }
          </ul>
          <div class="mt-3 flex gap-2">
            <button
              type="button"
              class="inline-flex h-10 flex-1 items-center justify-center rounded-codexa border border-codexa-border font-mono text-xs font-medium text-codexa-secondary"
              (click)="i18n.toggleLang()"
            >
              {{ 'nav.langSwitch' | t: lang() }}
            </button>
          </div>
          <div class="mt-3">
            <cx-button
              variant="primary"
              size="md"
              [fullWidth]="true"
              (click)="navigate($event, 'pricing'); closeMobile()"
            >
              {{ 'nav.enroll' | t: lang() }}
            </cx-button>
          </div>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly lang = this.i18n.lang;
  protected readonly mobileOpen = signal(false);

  protected readonly links = computed(() => [
    { labelKey: 'nav.courses', fragment: 'features' },
    { labelKey: 'nav.methodology', fragment: 'methodology' },
    { labelKey: 'nav.curriculum', fragment: 'curriculum' },
    { labelKey: 'nav.pricing', fragment: 'pricing' },
  ]);

  protected toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }

  protected navigate(event: Event, fragment: string): void {
    event.preventDefault();
    document
      .getElementById(fragment)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected scrollTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { LucideMenu, LucideX } from '@lucide/angular';
import { ButtonComponent } from '../button/button.component';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'cx-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, LucideMenu, LucideX],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-white/5 bg-codexa-obsidian/70 backdrop-blur-md"
    >
      <nav
        class="mx-auto flex h-16 max-w-wide items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#"
          class="group inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
          (click)="scrollTop($event)"
        >
          <span
            class="font-mono text-sm font-semibold text-codexa-electric transition-colors group-hover:text-indigo-400"
            aria-hidden="true"
            >&gt;_</span
          >
          <span
            class="text-sm font-bold tracking-[0.14em] text-codexa-primary sm:text-base"
          >
            CODEXA
          </span>
        </a>

        <ul class="hidden items-center gap-1 md:flex">
          @for (link of links; track link.fragment) {
            <li>
              <a
                [href]="'#' + link.fragment"
                class="rounded-md px-3 py-2 text-sm font-medium text-codexa-secondary transition-colors duration-200 hover:bg-codexa-surface-hover/40 hover:text-codexa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50"
                (click)="navigate($event, link.fragment)"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <div class="hidden md:block">
          <cx-button variant="primary" size="md" (click)="navigate($event, 'pricing')">
            Enroll Now
          </cx-button>
        </div>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-codexa border border-codexa-border text-codexa-primary transition-colors hover:bg-codexa-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50 md:hidden"
          [attr.aria-expanded]="mobileOpen()"
          aria-controls="mobile-nav"
          (click)="toggleMobile()"
        >
          @if (mobileOpen()) {
            <svg lucideX [size]="20"></svg>
            <span class="sr-only">Close menu</span>
          } @else {
            <svg lucideMenu [size]="20"></svg>
            <span class="sr-only">Open menu</span>
          }
        </button>
      </nav>

      @if (mobileOpen()) {
        <div
          id="mobile-nav"
          class="border-t border-codexa-border bg-codexa-obsidian/95 px-4 py-4 backdrop-blur-md md:hidden"
        >
          <ul class="flex flex-col gap-1">
            @for (link of links; track link.fragment) {
              <li>
                <a
                  [href]="'#' + link.fragment"
                  class="block rounded-md px-3 py-2.5 text-sm font-medium text-codexa-secondary transition-colors hover:bg-codexa-surface-hover hover:text-codexa-primary"
                  (click)="navigate($event, link.fragment); closeMobile()"
                >
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
          <div class="mt-4">
            <cx-button
              variant="primary"
              size="md"
              [fullWidth]="true"
              (click)="navigate($event, 'pricing'); closeMobile()"
            >
              Enroll Now
            </cx-button>
          </div>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  protected readonly mobileOpen = signal(false);

  protected readonly links: NavLink[] = [
    { label: 'Courses', fragment: 'features' },
    { label: 'Methodology', fragment: 'methodology' },
    { label: 'Curriculum', fragment: 'curriculum' },
    { label: 'Pricing', fragment: 'pricing' },
  ];

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

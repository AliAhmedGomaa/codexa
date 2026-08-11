import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Fades/slides content in when it enters the viewport.
 * Usage: <div cxReveal>…</div> or <div cxReveal="up">…</div>
 */
@Directive({
  selector: '[cxReveal]',
  standalone: true,
  host: {
    '[class.cx-reveal]': 'true',
    '[class.cx-reveal--visible]': 'visible()',
    '[class.cx-reveal--up]': 'direction() === "up"',
    '[class.cx-reveal--left]': 'direction() === "left"',
    '[class.cx-reveal--right]': 'direction() === "right"',
    '[class.cx-reveal--scale]': 'direction() === "scale"',
    '[style.transition-delay]': 'delay()',
  },
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Animation direction */
  readonly direction = input<'up' | 'left' | 'right' | 'scale', string>('up', {
    alias: 'cxReveal',
    transform: (value: string | null | undefined) => {
      if (value === 'left' || value === 'right' || value === 'scale') {
        return value;
      }
      return 'up';
    },
  });

  /** Optional delay e.g. "120ms" */
  readonly delay = input('0ms', { alias: 'cxRevealDelay' });

  protected readonly visible = signal(false);

  ngOnInit(): void {
    if (typeof window === 'undefined') {
      this.visible.set(true);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.visible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.visible.set(true);
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

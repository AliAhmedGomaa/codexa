import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type BadgeVariant = 'electric' | 'cyan' | 'emerald';

@Component({
  selector: 'cx-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()">
      @if (pulse()) {
        <span
          class="relative flex h-1.5 w-1.5 shrink-0"
          aria-hidden="true"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            [class]="dotPingClass()"
          ></span>
          <span
            class="relative inline-flex h-1.5 w-1.5 rounded-full"
            [class]="dotClass()"
          ></span>
        </span>
      }
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('electric');
  readonly pulse = input(false);

  protected readonly classes = computed(() => {
    const base =
      'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-xs font-medium tracking-wide';

    const variants: Record<BadgeVariant, string> = {
      electric: 'bg-codexa-electric/15 text-codexa-electric ring-1 ring-inset ring-codexa-electric/25',
      cyan: 'bg-codexa-cyan/15 text-codexa-cyan ring-1 ring-inset ring-codexa-cyan/25',
      emerald: 'bg-codexa-emerald/15 text-codexa-emerald ring-1 ring-inset ring-codexa-emerald/25',
    };

    return `${base} ${variants[this.variant()]}`;
  });

  protected readonly dotClass = computed(() => {
    const map: Record<BadgeVariant, string> = {
      electric: 'bg-codexa-electric',
      cyan: 'bg-codexa-cyan',
      emerald: 'bg-codexa-emerald',
    };
    return map[this.variant()];
  });

  protected readonly dotPingClass = computed(() => this.dotClass());
}

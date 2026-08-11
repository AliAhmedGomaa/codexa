import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type CardPadding = 'sm' | 'md' | 'lg';

@Component({
  selector: 'cx-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
  template: `<ng-content />`,
})
export class CardComponent {
  /** Soft lift + border brighten on hover */
  readonly interactive = input(true);
  readonly padding = input<CardPadding>('md');

  protected readonly hostClasses = computed(() => {
    const paddings: Record<CardPadding, string> = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return [
      'glass-card block rounded-codexa',
      'border border-codexa-border',
      'transition-all duration-200 ease-codexa',
      paddings[this.padding()],
      this.interactive()
        ? 'hover:border-codexa-electric/35 hover:bg-gradient-to-br hover:from-codexa-surface-hover/90 hover:to-codexa-surface/80 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.12)]'
        : '',
    ]
      .filter(Boolean)
      .join(' ');
  });
}

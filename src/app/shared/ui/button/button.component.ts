import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'terminal';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'cx-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [attr.type]="type()"
      [disabled]="disabled()"
      [class]="classes()"
      [attr.aria-disabled]="disabled() || null"
    >
      @if (variant() === 'terminal') {
        <span class="select-none text-codexa-emerald" aria-hidden="true">$&nbsp;</span>
      }
      <span class="inline-flex items-center gap-2">
        <ng-content />
      </span>
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly fullWidth = input(false);
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  protected readonly classes = computed(() => {
    const base = [
      'inline-flex items-center justify-center gap-2',
      'rounded-codexa font-medium transition-all duration-200 ease-codexa',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50 focus-visible:ring-offset-2 focus-visible:ring-offset-codexa-obsidian',
      'disabled:pointer-events-none disabled:opacity-40',
      this.fullWidth() ? 'w-full' : '',
    ];

    const sizes: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    const variants: Record<ButtonVariant, string> = {
      primary: [
        'bg-codexa-electric text-white',
        'glow-primary animate-glow-breathe',
        'hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_30px_-4px_rgba(0,100,255,0.55)]',
        'active:translate-y-0 active:brightness-95',
      ].join(' '),
      secondary: [
        'glass-card text-codexa-primary',
        'hover:border-codexa-cyan/40 hover:text-codexa-cyan hover:bg-codexa-surface-hover/80',
        'active:scale-[0.98]',
      ].join(' '),
      terminal: [
        'font-mono bg-codexa-obsidian text-codexa-emerald',
        'border border-codexa-border',
        'hover:border-codexa-emerald/40 hover:bg-codexa-surface',
        'active:scale-[0.98]',
        'focus-visible:ring-codexa-emerald/50',
      ].join(' '),
    };

    return [...base, sizes[this.size()], variants[this.variant()]].filter(Boolean).join(' ');
  });
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'cx-brand-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="src()"
      alt="Codexa Academy"
      [class]="classes()"
      decoding="async"
    />
  `,
})
export class BrandLogoComponent {
  private readonly theme = inject(ThemeService);

  /** Optional extra classes for the img element */
  readonly imgClass = input('');

  protected readonly src = computed(() =>
    this.theme.theme() === 'dark'
      ? '/brand/logo-dark.png'
      : '/brand/logo-light.png',
  );

  protected readonly classes = computed(() =>
    [
      'h-full w-auto max-w-full object-contain object-left',
      this.imgClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}

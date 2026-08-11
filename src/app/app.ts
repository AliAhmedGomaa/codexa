import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/i18n/i18n.service';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: `:host { display: block; min-height: 100dvh; }`,
})
export class App {
  private readonly _i18n = inject(I18nService);
  private readonly _theme = inject(ThemeService);
}

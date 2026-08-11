import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { ThemeService } from '../../core/theme/theme.service';
import { NavbarComponent } from '../../shared/ui/navbar/navbar.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { InteractiveTerminalComponent } from './components/interactive-terminal/interactive-terminal.component';
import { PricingComponent } from './components/pricing/pricing.component';

@Component({
  selector: 'cx-landing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    InteractiveTerminalComponent,
    CurriculumComponent,
    PricingComponent,
    FooterComponent,
  ],
  template: `
    <div class="min-h-dvh bg-codexa-obsidian text-codexa-primary">
      <cx-navbar />
      <main>
        <cx-hero />
        <cx-features />
        <cx-interactive-terminal />
        <cx-curriculum />
        <cx-pricing />
      </main>
      <cx-footer />
    </div>
  `,
})
export class LandingComponent {
  /** Eagerly construct locale/theme services so DOM attrs apply immediately. */
  private readonly _i18n = inject(I18nService);
  private readonly _theme = inject(ThemeService);
}

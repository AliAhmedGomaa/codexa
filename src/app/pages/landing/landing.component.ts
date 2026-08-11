import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class LandingComponent {}

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
import { MiniCodeChallengeComponent } from './components/interactive/mini-code-challenge.component';
import { QualificationQuizComponent } from './components/interactive/qualification-quiz.component';
import { RoiCalculatorComponent } from './components/interactive/roi-calculator.component';
import { ScheduleToggleComponent } from './components/interactive/schedule-toggle.component';
import { StudentShowcaseComponent } from './components/interactive/student-showcase.component';
import { SyllabusModalComponent } from './components/interactive/syllabus-modal.component';
import { TechStackMatrixComponent } from './components/interactive/tech-stack-matrix.component';
import { TransparencyMetricsComponent } from './components/interactive/transparency-metrics.component';
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
    TransparencyMetricsComponent,
    InteractiveTerminalComponent,
    MiniCodeChallengeComponent,
    TechStackMatrixComponent,
    CurriculumComponent,
    ScheduleToggleComponent,
    StudentShowcaseComponent,
    RoiCalculatorComponent,
    PricingComponent,
    SyllabusModalComponent,
    QualificationQuizComponent,
    FooterComponent,
  ],
  template: `
    <div class="min-h-dvh bg-codexa-obsidian text-codexa-primary">
      <cx-navbar />
      <main>
        <cx-hero />
        <cx-features />
        <cx-transparency-metrics />
        <cx-interactive-terminal />
        <cx-mini-code-challenge />
        <cx-tech-stack-matrix />
        <cx-curriculum />
        <cx-schedule-toggle />
        <cx-student-showcase />
        <cx-roi-calculator />
        <cx-pricing />
        <cx-syllabus-modal />
        <cx-qualification-quiz />
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

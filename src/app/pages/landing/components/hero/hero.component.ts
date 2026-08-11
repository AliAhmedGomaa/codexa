import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { TerminalWindowComponent } from '../../../../shared/ui/terminal-window/terminal-window.component';

@Component({
  selector: 'cx-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, ButtonComponent, TerminalWindowComponent, TranslatePipe],
  template: `
    <section
      class="relative overflow-hidden border-b border-codexa-border"
      aria-labelledby="hero-heading"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(0,100,255,0.22),transparent_55%)]"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        aria-hidden="true"
      ></div>

      <div
        class="relative mx-auto grid max-w-wide items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24"
      >
        <div class="animate-fade-up">
          <p
            class="mb-5 font-mono text-sm font-semibold tracking-[0.18em] text-codexa-electric"
          >
            <span aria-hidden="true">&gt;_</span>
            {{ 'hero.eyebrow' | t: lang() }}
          </p>

          <h1
            id="hero-heading"
            class="max-w-xl text-4xl font-bold tracking-tight text-codexa-primary sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
          >
            {{ 'hero.title' | t: lang() }}
          </h1>

          <p class="mt-5 max-w-lg text-base leading-relaxed text-codexa-secondary sm:text-lg">
            {{ 'hero.subtitle' | t: lang() }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <cx-button variant="primary" size="lg" (click)="scrollTo('programs')">
              {{ 'hero.ctaPrimary' | t: lang() }}
            </cx-button>
            <cx-button variant="terminal" size="lg" (click)="scrollTo('methodology')">
              {{ 'hero.ctaTerminal' | t: lang() }}
            </cx-button>
          </div>
        </div>

        <div class="relative animate-fade-up-delayed lg:justify-self-end">
          <div
            class="absolute -inset-4 rounded-[1.25rem] bg-codexa-electric/10 blur-2xl"
            aria-hidden="true"
          ></div>
          <div class="relative transition-transform duration-500 ease-codexa hover:-translate-y-1 animate-float">
            <div class="mb-3 flex justify-end">
              <cx-badge variant="emerald" [pulse]="true">
                {{ 'hero.badge' | t: lang() }}
              </cx-badge>
            </div>
            <cx-terminal-window fileName="main.ts">
              <pre class="m-0 whitespace-pre-wrap text-left text-[13px] sm:text-sm">
<span class="text-codexa-muted">// Codexa · production bootstrap</span>
<span class="text-codexa-electric">import</span> &#123; NestFactory &#125; <span class="text-codexa-electric">from</span> <span class="text-codexa-cyan">'&#64;nestjs/core'</span>;
<span class="text-codexa-electric">import</span> &#123; AppModule &#125; <span class="text-codexa-electric">from</span> <span class="text-codexa-cyan">'./app.module'</span>;

<span class="text-codexa-electric">async function</span> <span class="text-codexa-emerald">bootstrap</span>() &#123;
  <span class="text-codexa-electric">const</span> app = <span class="text-codexa-electric">await</span> NestFactory.create(AppModule);
  <span class="text-codexa-electric">await</span> app.listen(<span class="text-codexa-cyan">3000</span>);
&#125;

bootstrap();
<span class="text-codexa-muted">// → listening on :3000</span><span class="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-codexa-emerald/80 align-middle"></span>
              </pre>
            </cx-terminal-window>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

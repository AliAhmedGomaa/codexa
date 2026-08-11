import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/animations/reveal-on-scroll.directive';
import { CardComponent } from '../../../../shared/ui/card/card.component';

type NodeId =
  | 'typescript'
  | 'angular'
  | 'nestjs'
  | 'mongodb'
  | 'jwt'
  | 'docker'
  | 'ci';

interface StackNode {
  id: NodeId;
  label: string;
  links: NodeId[];
  explainKey: string;
  x: number;
  y: number;
}

@Component({
  selector: 'cx-tech-stack-matrix',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section
      id="stack"
      class="scroll-mt-header border-b border-codexa-border py-16 sm:py-24"
      aria-labelledby="stack-heading"
    >
      <div class="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center" cxReveal>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-codexa-cyan">
            {{ 'stack.eyebrow' | t: lang() }}
          </p>
          <h2
            id="stack-heading"
            class="mt-3 text-3xl font-bold tracking-tight text-codexa-primary sm:text-4xl"
          >
            {{ 'stack.title' | t: lang() }}
          </h2>
          <p class="mt-4 text-codexa-secondary">
            {{ 'stack.subtitle' | t: lang() }}
          </p>
        </div>

        <div class="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]" cxReveal>
          <div
            class="relative aspect-[4/3] overflow-hidden rounded-codexa border border-codexa-border bg-codexa-surface"
            role="application"
            [attr.aria-label]="'stack.mapLabel' | t: lang()"
          >
            <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              @for (edge of edges(); track edge.id) {
                <line
                  [attr.x1]="edge.x1"
                  [attr.y1]="edge.y1"
                  [attr.x2]="edge.x2"
                  [attr.y2]="edge.y2"
                  class="transition-all duration-300"
                  [attr.stroke]="edge.active ? 'rgb(0 100 255 / 0.7)' : 'rgb(100 116 139 / 0.25)'"
                  [attr.stroke-width]="edge.active ? 0.6 : 0.3"
                />
              }
            </svg>

            @for (node of nodes; track node.id) {
              <button
                type="button"
                class="absolute -translate-x-1/2 -translate-y-1/2 rounded-codexa border px-2.5 py-1.5 font-mono text-[11px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-codexa-electric/50 sm:text-xs"
                [style.left.%]="node.x"
                [style.top.%]="node.y"
                [class.border-codexa-electric]="isActive(node.id)"
                [class.bg-codexa-electric/20]="isActive(node.id)"
                [class.text-codexa-electric]="isActive(node.id)"
                [class.glow-primary]="active() === node.id"
                [class.scale-105]="active() === node.id"
                [class.border-codexa-border]="!isActive(node.id)"
                [class.bg-codexa-obsidian]="!isActive(node.id)"
                [class.text-codexa-secondary]="!isActive(node.id)"
                [class.opacity-40]="active() && !isActive(node.id)"
                (mouseenter)="active.set(node.id)"
                (focus)="active.set(node.id)"
                (click)="active.set(node.id)"
              >
                {{ node.label }}
              </button>
            }
          </div>

          <cx-card [interactive]="false" class="min-h-[12rem]">
            @if (activeNode(); as node) {
              <p class="font-mono text-xs uppercase tracking-wider text-codexa-electric">
                {{ node.label }}
              </p>
              <h3 class="mt-2 text-xl font-semibold text-codexa-primary">
                {{ 'stack.why' | t: lang() }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-codexa-secondary">
                {{ node.explainKey | t: lang() }}
              </p>
              <p class="mt-4 font-mono text-xs text-codexa-muted">
                {{ 'stack.connected' | t: lang() }}:
                {{ connectedLabels() }}
              </p>
            } @else {
              <p class="font-mono text-xs uppercase tracking-wider text-codexa-muted">
                {{ 'stack.hint' | t: lang() }}
              </p>
              <p class="mt-3 text-sm text-codexa-secondary">
                {{ 'stack.hintBody' | t: lang() }}
              </p>
            }
          </cx-card>
        </div>
      </div>
    </section>
  `,
})
export class TechStackMatrixComponent {
  private readonly i18n = inject(I18nService);
  protected readonly lang = this.i18n.lang;

  protected readonly active = signal<NodeId | null>('nestjs');

  protected readonly nodes: StackNode[] = [
    {
      id: 'typescript',
      label: 'TypeScript',
      links: ['angular', 'nestjs'],
      explainKey: 'stack.n.typescript',
      x: 18,
      y: 22,
    },
    {
      id: 'angular',
      label: 'Angular',
      links: ['typescript', 'jwt'],
      explainKey: 'stack.n.angular',
      x: 38,
      y: 48,
    },
    {
      id: 'nestjs',
      label: 'NestJS',
      links: ['typescript', 'mongodb', 'jwt', 'docker'],
      explainKey: 'stack.n.nestjs',
      x: 62,
      y: 28,
    },
    {
      id: 'mongodb',
      label: 'MongoDB',
      links: ['nestjs'],
      explainKey: 'stack.n.mongodb',
      x: 82,
      y: 52,
    },
    {
      id: 'jwt',
      label: 'JWT Auth',
      links: ['angular', 'nestjs'],
      explainKey: 'stack.n.jwt',
      x: 48,
      y: 72,
    },
    {
      id: 'docker',
      label: 'Docker',
      links: ['nestjs', 'ci'],
      explainKey: 'stack.n.docker',
      x: 78,
      y: 78,
    },
    {
      id: 'ci',
      label: 'CI/CD',
      links: ['docker'],
      explainKey: 'stack.n.ci',
      x: 22,
      y: 78,
    },
  ];

  protected readonly activeNode = computed(
    () => this.nodes.find((n) => n.id === this.active()) ?? null,
  );

  protected readonly edges = computed(() => {
    const active = this.active();
    const byId = new Map(this.nodes.map((n) => [n.id, n]));
    const seen = new Set<string>();
    const result: {
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      active: boolean;
    }[] = [];

    for (const node of this.nodes) {
      for (const link of node.links) {
        const id = [node.id, link].sort().join('-');
        if (seen.has(id)) continue;
        seen.add(id);
        const other = byId.get(link);
        if (!other) continue;
        const highlighted =
          !!active && (node.id === active || link === active);
        result.push({
          id,
          x1: node.x,
          y1: node.y,
          x2: other.x,
          y2: other.y,
          active: highlighted,
        });
      }
    }
    return result;
  });

  protected readonly connectedLabels = computed(() => {
    const node = this.activeNode();
    if (!node) return '';
    return node.links
      .map((id) => this.nodes.find((n) => n.id === id)?.label)
      .filter(Boolean)
      .join(' · ');
  });

  isActive(id: NodeId): boolean {
    const active = this.active();
    if (!active) return false;
    if (id === active) return true;
    const node = this.nodes.find((n) => n.id === active);
    return !!node?.links.includes(id);
  }
}

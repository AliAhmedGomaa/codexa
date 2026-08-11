import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'cx-terminal-window',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="overflow-hidden rounded-codexa border border-codexa-border bg-codexa-obsidian shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)]"
      role="region"
      [attr.aria-label]="'Terminal: ' + fileName()"
    >
      <!-- Chrome -->
      <div
        class="flex h-10 items-center gap-3 border-b border-codexa-border bg-codexa-surface px-4"
      >
        <div class="flex items-center gap-1.5" aria-hidden="true">
          <span class="h-3 w-3 rounded-full bg-[#FF5F57]"></span>
          <span class="h-3 w-3 rounded-full bg-[#FEBC2E]"></span>
          <span class="h-3 w-3 rounded-full bg-[#28C840]"></span>
        </div>

        <div
          class="flex min-w-0 flex-1 justify-center sm:justify-start sm:pl-2"
        >
          <span
            class="truncate rounded-md bg-codexa-obsidian/80 px-2.5 py-0.5 font-mono text-xs text-codexa-secondary ring-1 ring-inset ring-codexa-border"
          >
            {{ fileName() }}
          </span>
        </div>
      </div>

      <!-- Body -->
      <div
        class="overflow-x-auto bg-[#070A12] p-4 font-mono text-sm leading-relaxed text-codexa-primary sm:p-5"
      >
        <ng-content />
      </div>
    </div>
  `,
})
export class TerminalWindowComponent {
  readonly fileName = input('codexa — bash');
}

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
      dir="ltr"
      class="cx-terminal overflow-hidden rounded-codexa border border-white/10 bg-[#090D16] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)] [direction:ltr]"
      role="region"
      [attr.aria-label]="'Terminal: ' + fileName()"
    >
      <!-- Chrome — always dark, independent of page theme -->
      <div
        class="flex h-10 items-center gap-3 border-b border-white/10 bg-[#0F172A] px-4"
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
            class="truncate rounded-md bg-[#090D16]/80 px-2.5 py-0.5 font-mono text-xs text-slate-400 ring-1 ring-inset ring-white/10"
          >
            {{ fileName() }}
          </span>
        </div>
      </div>

      <!-- Body — always dark; default code text stays light -->
      <div
        class="cx-terminal__body overflow-x-auto bg-[#070A12] p-4 text-left font-mono text-sm leading-relaxed text-slate-100 sm:p-5"
      >
        <ng-content />
      </div>
    </div>
  `,
})
export class TerminalWindowComponent {
  readonly fileName = input('codexa — bash');
}

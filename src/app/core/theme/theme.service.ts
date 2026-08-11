import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'codexa-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.readInitial());

  constructor() {
    this.applyToDom(this.theme());
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    this.applyToDom(theme);
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private readInitial(): Theme {
    if (typeof localStorage === 'undefined') return 'dark';
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  }

  private applyToDom(theme: Theme): void {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.style.colorScheme = theme;
  }
}

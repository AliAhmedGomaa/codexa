import { Injectable, computed, signal } from '@angular/core';
import { DICTS, type Dict, type Lang } from './translations';

const STORAGE_KEY = 'codexa-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.readInitial());

  readonly dir = computed(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));

  readonly dict = computed<Dict>(() => DICTS[this.lang()]);

  constructor() {
    this.applyToDom(this.lang());
  }

  t(key: string, params?: Record<string, string | number>): string {
    let value = this.dict()[key] ?? DICTS.en[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replaceAll(`{{${k}}}`, String(v));
      }
    }
    return value;
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    this.applyToDom(lang);
  }

  toggleLang(): void {
    this.setLang(this.lang() === 'ar' ? 'en' : 'ar');
  }

  private readInitial(): Lang {
    if (typeof localStorage === 'undefined') return 'ar';
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'ar' ? saved : 'ar';
  }

  private applyToDom(lang: Lang): void {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    root.classList.toggle('font-ar', lang === 'ar');
    document.title = DICTS[lang]['meta.title'] ?? 'Codexa';

    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', DICTS[lang]['meta.description'] ?? '');
    }
  }
}

import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';
import type { Lang } from './translations';

/** Pure pipe — pass `i18n.lang()` as the second arg so OnPush updates correctly. */
@Pipe({ name: 't', standalone: true, pure: true })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: string, _lang: Lang, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }
}

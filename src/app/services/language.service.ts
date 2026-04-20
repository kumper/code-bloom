import {Injectable, signal} from '@angular/core';
import en from '../i18n/en.json';
import pl from '../i18n/pl.json';

export type Lang = 'pl' | 'en';

type Translations = Record<string, string>;

const translations: Record<Lang, Translations> = {en, pl};

@Injectable({providedIn: 'root'})
export class LanguageService {
  readonly lang = signal<Lang>('pl');

  toggle(): void {
    this.lang.update(l => (l === 'pl' ? 'en' : 'pl'));
  }

  t(key: string, params?: Record<string, string>): string {
    let str = translations[this.lang()][key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replaceAll(`{${k}}`, v);
      }
    }
    return str;
  }
}


import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-lang-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="btn btn-lang-toggle"
      (click)="langService.toggle()"
      [attr.aria-label]="'Switch language to ' + (langService.lang() === 'pl' ? 'English' : 'Polski')"
    >
      {{ langService.t('lang.toggle') }}
    </button>
  `,
  styles: [`
    .btn-lang-toggle {
      border: 2px solid var(--pink-primary);
      color: var(--pink-primary);
      background: transparent;
      font-weight: 600;
      font-size: 0.875rem;
      padding: 0.35rem 0.9rem;
      border-radius: 50px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .btn-lang-toggle:hover {
      background: var(--pink-primary);
      color: #fff;
    }
  `],
})
export class LangToggleComponent {
  protected readonly langService = inject(LanguageService);
}


import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-category-intro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-intro.html',
  styleUrl: './category-intro.css',
})
export class CategoryIntroComponent {
  title = input.required<string>();
  body = input.required<string>();
  dismissible = input(false);

  dismiss = output<void>();

  protected readonly langService = inject(LanguageService);
}

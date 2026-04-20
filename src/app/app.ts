import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LanguageService} from './services/language.service';
import {LangToggleComponent} from './components/lang-toggle/lang-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LangToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly langService = inject(LanguageService);
}

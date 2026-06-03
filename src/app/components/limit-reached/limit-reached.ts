import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-limit-reached',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './limit-reached.html',
  styleUrl: './limit-reached.css',
})
export class LimitReachedComponent {
  isDailyLimit = input.required<boolean>();
  userName = input.required<string>();
  totalPoints = input.required<number>();
  dailyLimit = input.required<number>();
  protected readonly langService = inject(LanguageService);
}



import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-quiz-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3 px-1">
      <span class="quiz__greeting text-muted">
        {{ langService.t('quiz.greeting', { name: name() }) }}
      </span>
      <div class="d-flex gap-3 align-items-center">
        <span class="quiz__stat"
              [attr.aria-label]="exercisesToday() + ' of ' + dailyLimit() + ' exercises done today'">
          📝 {{ exercisesToday() }}&nbsp;/&nbsp;{{ dailyLimit() }}
        </span>
        <span class="quiz__stat"
              [attr.aria-label]="totalPoints() + ' total points'">
          ⭐ {{ totalPoints() }} pts
        </span>
      </div>
    </div>
  `,
})
export class QuizHeaderComponent {
  name          = input.required<string>();
  exercisesToday = input.required<number>();
  totalPoints   = input.required<number>();
  dailyLimit    = input.required<number>();

  protected readonly langService = inject(LanguageService);
}


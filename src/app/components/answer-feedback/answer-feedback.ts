import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-answer-feedback',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './answer-feedback.html',
  styleUrl: './answer-feedback.css',
})
export class AnswerFeedbackComponent {
  isCorrect = input.required<boolean>();
  correctAnswer = input.required<string>();
  showNextButton = input.required<boolean>();
  explainUrl = input.required<string>();
  dailyLimit = input.required<number>();

  nextQuestion = output<void>();
  explainClick = output<void>();

  readonly confettiPieces = Array.from({length: 20}, (_, i) => i);
  protected readonly langService = inject(LanguageService);
}



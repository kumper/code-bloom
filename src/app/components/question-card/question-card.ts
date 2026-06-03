import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal, untracked} from '@angular/core';
import {QuizAnswer, QuizSubmission} from '../../models/quiz-answer.model';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-question-card',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './question-card.html',
  styleUrl: './question-card.css',
})
export class QuestionCardComponent {
  questionNumber = input.required<number>();
  question = input.required<string>();
  codeSnippet = input.required<string>();
  answers = input.required<QuizAnswer[]>();
  tags = input<string[]>([]);

  save = output<QuizSubmission>();
  tagClick = output<string>();

  readonly selectedAnswerValue = signal('');
  protected readonly langService = inject(LanguageService);

  constructor() {
    effect(() => {
      this.questionNumber(); // track question changes
      untracked(() => this.selectedAnswerValue.set(''));
    });
  }

  onSubmit(): void {
    const answer = this.selectedAnswerValue();
    if (answer) {
      this.save.emit({
        questionNumber: this.questionNumber(),
        selectedAnswer: answer,
      });
    }
  }
}




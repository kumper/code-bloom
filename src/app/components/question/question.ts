import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked
} from '@angular/core';
import {LanguageService} from '../../services/language.service';
import {QuizAnswer, QuizSubmission} from '../../models/quiz-answer.model';

@Component({
  selector: 'app-question',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './question.html',
  styleUrl: './question.css',
})
export class QuestionComponent {
  questionNumber = input.required<number>();
  question = input.required<string>();
  codeSnippet = input.required<string>();
  answers = input.required<QuizAnswer[]>();
  tags = input<string[]>([]);

  save = output<QuizSubmission>();
  tagClick = output<string>();

  readonly selectedAnswerValue = signal('');

  protected readonly langService = inject(LanguageService);

  readonly feedbackHref = computed(() => {
    const subject = encodeURIComponent('CodeBloom Feedback');
    const body = encodeURIComponent(this.langService.t('quiz.feedback.body'));
    return `mailto:kumper@op.pl?subject=${subject}&body=${body}`;
  });

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

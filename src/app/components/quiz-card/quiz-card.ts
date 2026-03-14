import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

export interface QuizAnswer {
  label: string;
  text: string;
}

export interface QuizSubmission {
  questionNumber: number;
  selectedAnswer: string;
}

@Component({
  selector: 'app-quiz-card',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.css',
})
export class QuizCardComponent {
  questionNumber = input.required<number>();
  question = input.required<string>();
  codeSnippet = input.required<string>();
  answers = input.required<QuizAnswer[]>();
  tags = input<string[]>([]);

  save = output<QuizSubmission>();

  selectedAnswerValue = '';

  selectedAnswer = input<string>('');

  onAnswerChange(): void {
    // Update is handled by ngModel
  }

  onSubmit(): void {
    if (this.selectedAnswerValue) {
      this.save.emit({
        questionNumber: this.questionNumber(),
        selectedAnswer: this.selectedAnswerValue
      });
    }
  }
}

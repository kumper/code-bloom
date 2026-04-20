import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LanguageService} from '../../services/language.service';

export interface QuizAnswer {
  label: string;
  textEN: string;
  textPL: string;
}

export interface QuizSubmission {
  questionNumber: number;
  selectedAnswer: string;
}

@Component({
  selector: 'app-question',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './question.html',
  styleUrl: './question.css',
  standalone: true
})
export class QuestionComponent {
  questionNumber = input.required<number>();
  question = input.required<string>();
  codeSnippet = input.required<string>();
  answers = input.required<QuizAnswer[]>();
  tags = input<string[]>([]);
  selectedAnswer = input<string>('');

  save = output<QuizSubmission>();

  selectedAnswerValue = '';

  protected readonly langService = inject(LanguageService);

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

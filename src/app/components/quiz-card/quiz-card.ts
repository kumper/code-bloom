import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-quiz-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.css',
})
export class QuizCardComponent {}

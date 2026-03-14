import {Component, signal} from '@angular/core';
import {QuizCard} from './components/quiz-card/quiz-card';

@Component({
  selector: 'app-root',
  imports: [QuizCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('code-bloom');
}

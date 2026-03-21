import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {QuizSubmission} from './components/question/question';
import {QuestionRepositoryService} from './services/question-repository.service';
import {WelcomeComponent} from './components/welcome/welcome';

@Component({
  selector: 'app-root',
  imports: [WelcomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class App {
  private readonly questionRepository = inject(QuestionRepositoryService);

  readonly currentQuestion = signal(this.questionRepository.getRandomQuestion());

  handleSave(submission: QuizSubmission): void {
    console.log('Question:', submission.questionNumber);
    console.log('Selected answer:', submission.selectedAnswer);

    if (submission.selectedAnswer === this.currentQuestion().correctAnswer) {
      alert('✅ Correct!');
    } else {
      alert('❌ Incorrect. Try again!');
    }
  }
}


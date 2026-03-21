import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {GenericFrameComponent} from './components/generic-frame/generic-frame';
import {QuestionComponent, QuizSubmission} from './components/question/question';
import {QuestionRepositoryService} from './services/question-repository.service';

@Component({
  selector: 'app-root',
  imports: [GenericFrameComponent, QuestionComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css',
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


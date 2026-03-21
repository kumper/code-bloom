import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
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
}


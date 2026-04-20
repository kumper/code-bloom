import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionToken} from '../../models/session-token.model';
import {Question} from '../../models/question.model';
import {DAILY_LIMIT, SessionTokenService} from '../../services/session-token.service';
import {QuestionRepositoryService} from '../../services/question-repository.service';
import {QuestionComponent} from '../question/question';
import {GenericFrameComponent} from '../generic-frame/generic-frame';

type QuizState = 'loading' | 'daily-limit' | 'all-exhausted' | 'question' | 'answered';

@Component({
  selector: 'app-quiz',
  imports: [QuestionComponent, GenericFrameComponent],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tokenService = inject(SessionTokenService);
  private readonly questionRepo = inject(QuestionRepositoryService);

  readonly state = signal<QuizState>('loading');
  readonly token = signal<SessionToken | null>(null);
  readonly currentQuestion = signal<Question | null>(null);
  readonly wasCorrect = signal<boolean | null>(null);

  readonly dailyLimit = DAILY_LIMIT;
  readonly confettiPieces = Array.from({length: 20}, (_, i) => i);
  readonly userName = computed(() => this.token()?.name ?? '');
  readonly totalPoints = computed(() => this.token()?.totalPoints ?? 0);
  readonly exercisesToday = computed(
    () => this.token()?.dailyProgress.exercisesCompletedToday ?? 0,
  );

  ngOnInit(): void {
    const raw = this.route.snapshot.queryParamMap.get('token');
    if (!raw) {
      void this.router.navigate(['/']);
      return;
    }

    const decoded = this.tokenService.decode(raw);
    if (!decoded) {
      void this.router.navigate(['/']);
      return;
    }

    this.token.set(decoded);
    this.loadNextQuestion(decoded);
  }

  onAnswerSubmitted(selectedAnswer: string): void {
    const token = this.token();
    const question = this.currentQuestion();
    if (!token || !question) return;

    const correct = selectedAnswer === question.correctAnswer;
    const updated = this.tokenService.recordAnswer(token, question.id, correct);

    this.token.set(updated);
    this.wasCorrect.set(correct);
    this.state.set('answered');
    this.updateUrlToken(updated);
  }

  onNextQuestion(): void {
    const token = this.token();
    if (!token) return;
    this.wasCorrect.set(null);
    this.loadNextQuestion(token);
  }

  private loadNextQuestion(token: SessionToken): void {
    if (this.tokenService.isDailyLimitReached(token)) {
      this.state.set('daily-limit');
      return;
    }

    const question = this.questionRepo.getQuestionForSession(token);
    if (!question) {
      this.state.set('all-exhausted');
      return;
    }

    const updated = this.tokenService.recordQuestionSeen(token, question.id);
    this.token.set(updated);
    this.currentQuestion.set(question);
    this.state.set('question');
    this.updateUrlToken(updated);
  }

  private updateUrlToken(token: SessionToken): void {
    const encoded = this.tokenService.encode(token);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {token: encoded},
      replaceUrl: true,
    });
  }
}




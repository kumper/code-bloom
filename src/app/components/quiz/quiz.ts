import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {SessionToken} from '../../models/session-token.model';
import {Question} from '../../models/question.model';
import {SessionTokenService} from '../../services/session-token.service';
import {QuizService, QuizState} from '../../services/quiz.service';
import {QuestionCardComponent} from '../question-card/question-card';
import {AnswerFeedbackComponent} from '../answer-feedback/answer-feedback';
import {LimitReachedComponent} from '../limit-reached/limit-reached';
import {GenericFrameComponent} from '../generic-frame/generic-frame';
import {BloomLoaderComponent} from '../bloom-loader/bloom-loader';
import {LanguageService} from '../../services/language.service';
import {ExplainService} from '../../services/explain.service';
import {QuizHeaderComponent} from '../quiz-header/quiz-header';
import {CategoryIntroComponent} from '../category-intro/category-intro';
import {CATEGORY_INTROS} from '../../data/category-intros';

@Component({
  selector: 'app-quiz',
  imports: [
    QuestionCardComponent,
    AnswerFeedbackComponent,
    LimitReachedComponent,
    GenericFrameComponent,
    BloomLoaderComponent,
    QuizHeaderComponent,
    CategoryIntroComponent,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly tokenService = inject(SessionTokenService);
  private readonly quizService = inject(QuizService);
  protected readonly langService = inject(LanguageService);
  private readonly explainService = inject(ExplainService);

  readonly state = signal<QuizState>('blooming');
  readonly token = signal<SessionToken | null>(null);
  readonly currentQuestion = signal<Question | null>(null);
  readonly wasCorrect = signal<boolean | null>(null);
  readonly showingIntroCategory = signal<string | null>(null);
  readonly introOnDemand = signal(false);
  readonly limitIsDailyLimit = signal(false);

  readonly userName = computed(() => this.token()?.name ?? '');
  readonly totalPoints = computed(() => this.token()?.totalPoints ?? 0);
  readonly exercisesToday = computed(
    () => this.token()?.dailyProgress.exercisesCompletedToday ?? 0,
  );
  readonly dailyLimit = computed(() => this.quizService.dailyLimit);

  readonly localizedQuestion = computed(() => {
    const q = this.currentQuestion();
    if (!q) return null;
    return this.langService.pick(q.questionEN, q.questionPL);
  });

  readonly localizedSnippet = computed(() => {
    const q = this.currentQuestion();
    if (!q) return '';
    return this.langService.pick(q.codeSnippetEN, q.codeSnippetPL);
  });

  readonly introTitle = computed(() => {
    const category = this.showingIntroCategory();
    if (!category || !CATEGORY_INTROS[category]) {
      return '';
    }
    return this.langService.pick(CATEGORY_INTROS[category].titleEN, CATEGORY_INTROS[category].titlePL);
  });

  readonly introBody = computed(() => {
    const category = this.showingIntroCategory();
    if (!category || !CATEGORY_INTROS[category]) {
      return '';
    }
    return this.langService.pick(CATEGORY_INTROS[category].bodyEN, CATEGORY_INTROS[category].bodyPL);
  });

  readonly liveAnnouncement = computed(() => {
    switch (this.state()) {
      case 'answered':
        return this.wasCorrect()
          ? this.langService.t('quiz.correct.heading')
          : this.langService.t('quiz.wrong.heading');
      case 'limit-reached':
        return this.limitIsDailyLimit()
          ? this.langService.t('quiz.dailyLimit.heading', {name: this.userName()})
          : this.langService.t('quiz.allExhausted.heading', {name: this.userName()});
      case 'category-intro':
      default:
        return '';
    }
  });

  ngOnInit(): void {
    const token = this.tokenService.load();
    if (!token) {
      void this.router.navigate(['/']);
      return;
    }
    this.token.set(token);
  }

  onBloomDone(): void {
    const t = this.token();
    if (!t) return;
    this.loadNextQuestion(t);
  }

  onAnswerSubmitted(selectedAnswer: string): void {
    const token = this.token();
    const question = this.currentQuestion();
    if (!token || !question) return;

    const {updated, correct} = this.quizService.processAnswer(token, question, selectedAnswer);
    this.token.set(updated);
    this.wasCorrect.set(correct);
    this.state.set('answered');
    this.persistToken(updated);
  }

  onNextQuestion(): void {
    const token = this.token();
    if (!token) return;
    this.wasCorrect.set(null);
    this.loadNextQuestion(token);
  }

  onIntroDismissed(): void {
    const token = this.token();
    const question = this.currentQuestion();
    if (!token || !question) return;

    const updated = this.quizService.processCategoryIntroDismissal(token, question, this.introOnDemand());
    if (updated !== token) {
      this.token.set(updated);
      this.persistToken(updated);
    }

    this.showingIntroCategory.set(null);
    this.introOnDemand.set(false);
    this.state.set('question');
  }

  onTagClicked(tag: string): void {
    const category = tag.replace('#', '');
    this.showingIntroCategory.set(category);
    this.introOnDemand.set(true);
    this.state.set('category-intro');
  }

  buildExplainUrl(): string {
    const q = this.currentQuestion();
    return q ? this.explainService.buildUrl(q) : '';
  }

  private loadNextQuestion(token: SessionToken): void {
    const {question, limitReached, updatedToken} = this.quizService.loadNextQuestion(
      token,
      token.categoryStreak?.category,
    );

    // Limit reached
    if (limitReached) {
      this.token.set(updatedToken);
      this.limitIsDailyLimit.set(limitReached.isDailyLimit);
      this.state.set('limit-reached');
      return;
    }

    // No question found (shouldn't happen with current logic but good to handle)
    if (!question) {
      this.state.set('limit-reached');
      this.limitIsDailyLimit.set(false);
      return;
    }

    // Check if category intro should be shown
    if (this.quizService.isCategoryNew(token, question)) {
      this.showingIntroCategory.set(this.quizService.getQuestionCategory(question));
      this.currentQuestion.set(question);
      this.state.set('category-intro');
      return;
    }

    // Record question view and update token
    const updated = this.quizService.recordQuestionView(updatedToken, question);
    this.token.set(updated);
    this.currentQuestion.set(question);
    this.state.set('question');
    this.persistToken(updated);
  }

  private persistToken(token: SessionToken): void {
    this.tokenService.save(token);
  }
}


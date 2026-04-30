import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionToken} from '../../models/session-token.model';
import {Question} from '../../models/question.model';
import {DAILY_LIMIT, SessionTokenService} from '../../services/session-token.service';
import {QuestionRepositoryService} from '../../services/question-repository.service';
import {QuestionComponent} from '../question/question';
import {GenericFrameComponent} from '../generic-frame/generic-frame';
import {BloomLoaderComponent} from '../bloom-loader/bloom-loader';
import {LanguageService} from '../../services/language.service';
import {ExplainService} from '../../services/explain.service';
import {QuizHeaderComponent} from '../quiz-header/quiz-header';
import {CategoryIntroComponent} from '../category-intro/category-intro';
import {CATEGORY_INTROS} from '../../data/category-intros';

type QuizState = 'blooming' | 'daily-limit' | 'all-exhausted' | 'category-intro' | 'question' | 'answered';

@Component({
  selector: 'app-quiz',
  imports: [QuestionComponent, GenericFrameComponent, BloomLoaderComponent, QuizHeaderComponent, CategoryIntroComponent],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tokenService = inject(SessionTokenService);
  private readonly questionRepo = inject(QuestionRepositoryService);
  protected readonly langService = inject(LanguageService);
  private readonly explainService = inject(ExplainService);

  readonly state = signal<QuizState>('blooming');
  readonly token = signal<SessionToken | null>(null);
  readonly currentQuestion = signal<Question | null>(null);
  readonly wasCorrect = signal<boolean | null>(null);
  readonly showingIntroCategory = signal<string | null>(null);
  readonly introOnDemand = signal(false);

  readonly dailyLimit = DAILY_LIMIT;
  readonly confettiPieces = Array.from({length: 20}, (_, i) => i);
  readonly userName = computed(() => this.token()?.name ?? '');
  readonly totalPoints = computed(() => this.token()?.totalPoints ?? 0);
  readonly exercisesToday = computed(
    () => this.token()?.dailyProgress.exercisesCompletedToday ?? 0,
  );

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
      case 'daily-limit':
        return this.langService.t('quiz.dailyLimit.heading', {name: this.userName()});
      case 'all-exhausted':
        return this.langService.t('quiz.allExhausted.heading', {name: this.userName()});
      case 'category-intro':
      default:
        return '';
    }
  });

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

  onIntroDismissed(): void {
    const token = this.token();
    const category = this.showingIntroCategory();
    const question = this.currentQuestion();
    if (!token || !category || !question) return;

    if (!this.introOnDemand()) {
      let updated = this.tokenService.markCategorySeen(token, category);
      updated = this.tokenService.startCategoryStreak(updated, category);
      updated = this.tokenService.recordQuestionSeen(updated, question.id);
      updated = this.tokenService.decrementStreak(updated);
      this.token.set(updated);
      this.state.set('question');
      this.updateUrlToken(updated);
    } else {
      this.state.set('question');
    }

    this.showingIntroCategory.set(null);
    this.introOnDemand.set(false);
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
    if (this.tokenService.isDailyLimitReached(token)) {
      this.state.set('daily-limit');
      return;
    }

    const streakCategory = token.categoryStreak?.category;
    const question = this.questionRepo.getQuestionForSession(token, streakCategory ?? undefined);

    if (!question) {
      if (streakCategory) {
        const clearedToken = {...token, categoryStreak: null};
        this.token.set(clearedToken);
        this.loadNextQuestion(clearedToken);
        return;
      }

      this.state.set('all-exhausted');
      return;
    }

    const category = this.questionRepo.getQuestionCategory(question);
    if (category && this.tokenService.isCategoryNew(token, category)) {
      this.showingIntroCategory.set(category);
      this.currentQuestion.set(question);
      this.state.set('category-intro');
      return;
    }

    let updated = this.tokenService.recordQuestionSeen(token, question.id);
    if (token.categoryStreak) {
      updated = this.tokenService.decrementStreak(updated);
    }
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


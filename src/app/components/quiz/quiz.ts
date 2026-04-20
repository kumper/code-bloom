import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionToken} from '../../models/session-token.model';
import {Question} from '../../models/question.model';
import {DAILY_LIMIT, SessionTokenService} from '../../services/session-token.service';
import {QuestionRepositoryService} from '../../services/question-repository.service';
import {QuestionComponent} from '../question/question';
import {GenericFrameComponent} from '../generic-frame/generic-frame';
import {BloomLoaderComponent} from '../bloom-loader/bloom-loader';
import {LanguageService} from '../../services/language.service';

type QuizState = 'blooming' | 'daily-limit' | 'all-exhausted' | 'question' | 'answered';

@Component({
  selector: 'app-quiz',
  imports: [QuestionComponent, GenericFrameComponent, BloomLoaderComponent],
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

  readonly state = signal<QuizState>('blooming');
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

  readonly localizedQuestion = computed(() => {
    const q = this.currentQuestion();
    const lang = this.langService.lang();
    if (!q) return null;
    return lang === 'pl' ? q.questionPL : q.questionEN;
  });

  readonly localizedSnippet = computed(() => {
    const q = this.currentQuestion();
    const lang = this.langService.lang();
    if (!q) return '';
    return lang === 'pl' ? q.codeSnippetPL : q.codeSnippetEN;
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

  buildExplainUrl(): string {
    const q = this.currentQuestion();
    if (!q) return '';

    const lang = this.langService.lang();
    const isPl = lang === 'pl';

    const topics = (q.tags ?? [])
      .map(t => t.replace('#', ''))
      .join(', ');

    const answerLines = q.answers
      .map(a => `  ${a.label}) ${isPl ? a.textPL : a.textEN}`)
      .join('\n');

    const correctOption = q.answers.find(a => a.label === q.correctAnswer);
    const correctText = correctOption
      ? `${q.correctAnswer}) ${isPl ? correctOption.textPL : correctOption.textEN}`
      : q.correctAnswer;

    const snippet = isPl ? q.codeSnippetPL : q.codeSnippetEN;

    const prompt = isPl ? [
      `Jesteś przyjaznym nauczycielem Javy dla absolutnych początkujących. Odpowiedz bardzo krótko — maksymalnie 1–2 minuty czytania.`,
      ``,
      `Temat(y): ${topics}`,
      ``,
      `Uczniowi pokazano poniższy fragment kodu Java:`,
      `\`\`\`java`,
      snippet,
      `\`\`\``,
      ``,
      `Musiał wybrać spośród następujących odpowiedzi:`,
      answerLines,
      ``,
      `Poprawna odpowiedź to: ${correctText}`,
      ``,
      `Wyjaśnij krótko:`,
      `1. Dlaczego poprawna odpowiedź jest prawidłowa.`,
      `2. Dlaczego najbardziej kuszące błędne odpowiedzi są nieprawidłowe.`,
      `3. Jeden kluczowy koncept, który uczeń powinien zapamiętać.`,
      ``,
      `Używaj prostego języka, bez żargonu. Maksymalnie 150 słów.`,
    ].join('\n') : [
      `You are a friendly Java tutor for absolute beginners. Keep your answer very short — maximum 1–2 minutes to read.`,
      ``,
      `Topic(s): ${topics}`,
      ``,
      `A student was shown this Java code snippet:`,
      `\`\`\`java`,
      snippet,
      `\`\`\``,
      ``,
      `They had to choose from these answers:`,
      answerLines,
      ``,
      `The correct answer is: ${correctText}`,
      ``,
      `Please explain briefly:`,
      `1. Why the correct answer is right.`,
      `2. Why the most tempting wrong answers are incorrect.`,
      `3. One key concept the student should remember.`,
      ``,
      `Use simple language, no jargon, and keep it under 150 words.`,
    ].join('\n');

    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
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




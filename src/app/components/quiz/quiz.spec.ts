import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {QuizComponent} from './quiz';
import {SessionTokenService} from '../../services/session-token.service';
import {QuestionRepositoryService} from '../../services/question-repository.service';
import {SessionToken} from '../../models/session-token.model';
import {Question} from '../../models/question.model';

const mockQuestion: Question = {
  id: 1,
  questionEN: 'What is 1 + 1?',
  questionPL: 'Co to jest 1 + 1?',
  codeSnippetEN: 'System.out.println(1 + 1);',
  codeSnippetPL: 'System.out.println(1 + 1);',
  answers: [
    {label: 'a', textEN: '1', textPL: '1'},
    {label: 'b', textEN: '2', textPL: '2'},
  ],
  correctAnswer: 'b',
  tags: [],
};

const categoryQuestion: Question = {
  ...mockQuestion,
  id: 2,
  tags: ['#loops'],
};

function buildToken(overrides: Partial<SessionToken> = {}): SessionToken {
  return {
    version: 1,
    name: 'Alice',
    totalPoints: 0,
    dailyProgress: {date: '2026-03-21', exercisesCompletedToday: 0},
    history: [],
    seenCategories: [],
    categoryStreak: null,
    ...overrides,
  };
}

async function createFixture(
  token: SessionToken | null,
  questionResult: Question | null = mockQuestion,
): Promise<{
  fixture: ComponentFixture<QuizComponent>;
  component: QuizComponent;
  router: Router;
  questionRepo: QuestionRepositoryService;
}> {
  const tokenService = new SessionTokenService();
  if (token) {
    tokenService.save(token);
  } else {
    tokenService.clear();
  }

  await TestBed.configureTestingModule({
    imports: [QuizComponent],
    providers: [
      provideRouter([]),
      {provide: SessionTokenService, useValue: tokenService},
    ],
  }).compileComponents();

  const questionRepo = TestBed.inject(QuestionRepositoryService);
  vi.spyOn(questionRepo, 'getQuestionForSession').mockReturnValue(questionResult);

  const fixture = TestBed.createComponent(QuizComponent);
  const component = fixture.componentInstance;
  const router = TestBed.inject(Router);
  fixture.detectChanges();

  return {fixture, component, router, questionRepo};
}

describe('QuizComponent', () => {
  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should create', async () => {
    const {component} = await createFixture(buildToken());
    expect(component).toBeTruthy();
  });

  it('should show question state when a question is available', async () => {
    const {component} = await createFixture(buildToken({seenCategories: ['loops']}), categoryQuestion);
    component.onBloomDone();
    expect(component.state()).toBe('question');
    expect(component.currentQuestion()?.id).toBe(categoryQuestion.id);
  });

  it('should show category intro for a new category before the question', async () => {
    const {component} = await createFixture(buildToken(), categoryQuestion);
    component.onBloomDone();

    expect(component.state()).toBe('category-intro');
    expect(component.showingIntroCategory()).toBe('loops');
    expect(component.introTitle()).toBeTruthy();
  });

  it('should mark the category as seen when intro is dismissed', async () => {
    const {component} = await createFixture(buildToken(), categoryQuestion);
    component.onBloomDone();
    component.onIntroDismissed();

    expect(component.state()).toBe('question');
    expect(component.token()?.seenCategories).toContain('loops');
    expect(component.showingIntroCategory()).toBeNull();
    expect(component.introOnDemand()).toBe(false);
  });

  it('should show an intro on demand when a tag is clicked', async () => {
    const {component} = await createFixture(buildToken({seenCategories: ['loops']}), categoryQuestion);
    component.onBloomDone();
    component.onTagClicked('#loops');

    expect(component.state()).toBe('category-intro');
    expect(component.introOnDemand()).toBe(true);
    expect(component.showingIntroCategory()).toBe('loops');
  });

  it('should show daily-limit state when limit is reached', async () => {
    const today = new Date().toISOString().slice(0, 10);
    const {component} = await createFixture(
      buildToken({dailyProgress: {date: today, exercisesCompletedToday: 5}}),
    );
    component.onBloomDone();
    expect(component.state()).toBe('daily-limit');
  });

  it('should show all-exhausted state when no question is available', async () => {
    const {component} = await createFixture(buildToken(), null);
    component.onBloomDone();
    expect(component.state()).toBe('all-exhausted');
  });

  it('should award a point and set wasCorrect=true on correct answer', async () => {
    const {component} = await createFixture(buildToken());
    component.onBloomDone();
    component.onAnswerSubmitted('b');
    expect(component.wasCorrect()).toBe(true);
    expect(component.totalPoints()).toBe(1);
    expect(component.state()).toBe('answered');
  });

  it('should not award a point on wrong answer', async () => {
    const {component} = await createFixture(buildToken());
    component.onBloomDone();
    component.onAnswerSubmitted('a');
    expect(component.wasCorrect()).toBe(false);
    expect(component.totalPoints()).toBe(0);
    expect(component.state()).toBe('answered');
  });

  it('should redirect to / when no token is in localStorage', async () => {
    const {router} = await createFixture(null);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    expect(navigateSpy).not.toHaveBeenCalledWith(['/quiz']);
  });
});


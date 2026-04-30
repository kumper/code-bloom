import {TestBed} from '@angular/core/testing';
import {vi} from 'vitest';
import {QuestionRepositoryService} from './question-repository.service';
import {SessionToken} from '../models/session-token.model';

const emptyToken: SessionToken = {
  version: 1,
  name: 'Test',
  totalPoints: 0,
  dailyProgress: {date: '2026-04-20', exercisesCompletedToday: 0},
  history: [],
};

describe('QuestionRepositoryService', () => {
  let service: QuestionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a question for a fresh session', () => {
    const question = service.getQuestionForSession(emptyToken);
    expect(question).toBeTruthy();
    expect(question!.id).toBeDefined();
    expect(question!.questionEN).toBeDefined();
    expect(question!.codeSnippetEN).toBeDefined();
    expect(question!.answers.length).toBeGreaterThan(0);
    expect(question!.correctAnswer).toBeDefined();
  });

  it('should return a question with valid EN and PL answer texts', () => {
    const question = service.getQuestionForSession(emptyToken);
    for (const answer of question!.answers) {
      expect(answer.label).toBeDefined();
      expect(answer.textEN).toBeDefined();
      expect(answer.textPL).toBeDefined();
    }
  });

  it('should return null when all questions have been recently seen', () => {
    const allSeenToken: SessionToken = {
      ...emptyToken,
      history: Array.from({length: 70}, (_, i) => ({
        questionId: i + 1,
        firstSeenOn: '2026-04-20',
        lastSeenOn: '2026-04-20',
        correctCount: 0,
        wrongCount: 0,
      })),
    };
    expect(service.getQuestionForSession(allSeenToken)).toBeNull();
  });

  it('should return different questions over multiple calls', () => {
    const results = new Set<number>();
    const randomValues = [0, 0.4, 0.7];
    let callCount = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => randomValues[callCount++ % randomValues.length]);

    for (let i = 0; i < 3; i++) {
      results.add(service.getQuestionForSession(emptyToken)!.id);
    }

    vi.restoreAllMocks();
    expect(results.size).toBeGreaterThan(1);
  });
});

import {TestBed} from '@angular/core/testing';
import {QuizService} from './quiz.service';
import {SessionTokenService} from './session-token.service';
import {QuestionRepositoryService} from './question-repository.service';
import {SessionToken} from '../models/session-token.model';
import {Question} from '../models/question.model';
import {vi} from 'vitest';

describe('QuizService', () => {
  let service: QuizService;
  let tokenService: SessionTokenService;
  let questionRepo: QuestionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizService, SessionTokenService, QuestionRepositoryService],
    });

    service = TestBed.inject(QuizService);
    tokenService = TestBed.inject(SessionTokenService);
    questionRepo = TestBed.inject(QuestionRepositoryService);
  });

  afterEach(() => {
    localStorage.clear();
  });

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

  function buildQuestion(overrides: Partial<Question> = {}): Question {
    return {
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
      ...overrides,
    };
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('processAnswer', () => {
    it('should return correct=true when answer matches correct answer', () => {
      const token = buildToken();
      const question = buildQuestion();

      const result = service.processAnswer(token, question, 'b');

      expect(result.correct).toBe(true);
      expect(result.updated).not.toBe(token);
    });

    it('should return correct=false when answer does not match', () => {
      const token = buildToken();
      const question = buildQuestion();

      const result = service.processAnswer(token, question, 'a');

      expect(result.correct).toBe(false);
    });
  });

  describe('loadNextQuestion', () => {
    it('should return limit reached if daily limit is reached', () => {
      const today = new Date().toISOString().slice(0, 10);
      const token = buildToken({dailyProgress: {date: today, exercisesCompletedToday: 5}});

      const result = service.loadNextQuestion(token);

      expect(result.limitReached).not.toBeNull();
      expect(result.limitReached?.isDailyLimit).toBe(true);
    });

    it('should return question if available', () => {
      const token = buildToken();
      const question = buildQuestion();
      vi.spyOn(questionRepo, 'getQuestionForSession').mockReturnValue(question);

      const result = service.loadNextQuestion(token);

      expect(result.question).toBe(question);
      expect(result.limitReached).toBeNull();
    });

    it('should return limit reached (all exhausted) if no question available', () => {
      const token = buildToken();
      vi.spyOn(questionRepo, 'getQuestionForSession').mockReturnValue(null);

      const result = service.loadNextQuestion(token);

      expect(result.limitReached).not.toBeNull();
      expect(result.limitReached?.isDailyLimit).toBe(false);
    });
  });

  describe('recordQuestionView', () => {
    it('should record question as seen', () => {
      const token = buildToken();
      const question = buildQuestion();
      const recordSpy = vi.spyOn(tokenService, 'recordQuestionSeen');

      service.recordQuestionView(token, question);

      expect(recordSpy).toHaveBeenCalled();
    });
  });
});


import {TestBed} from '@angular/core/testing';
import {vi} from 'vitest';
import {QuestionRepositoryService} from './question-repository.service';

describe('QuestionRepositoryService', () => {
  let service: QuestionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a question from getRandomQuestion', () => {
    const question = service.getRandomQuestion();
    expect(question).toBeTruthy();
    expect(question.id).toBeDefined();
    expect(question.questionEN).toBeDefined();
    expect(question.codeSnippetEN).toBeDefined();
    expect(question.answers.length).toBeGreaterThan(0);
    expect(question.correctAnswer).toBeDefined();
  });

  it('should return a question with valid answers', () => {
    const question = service.getRandomQuestion();
    for (const answer of question.answers) {
      expect(answer.label).toBeDefined();
      expect(answer.textEN).toBeDefined();
      expect(answer.textPL).toBeDefined();
    }
  });

  it('should return different questions over multiple calls', () => {
    const results = new Set<number>();
    const randomValues = [0, 0.4, 0.7];
    let callCount = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => randomValues[callCount++ % randomValues.length]);

    for (let i = 0; i < 3; i++) {
      results.add(service.getRandomQuestion().id);
    }

    vi.restoreAllMocks();
    expect(results.size).toBeGreaterThan(1);
  });
});

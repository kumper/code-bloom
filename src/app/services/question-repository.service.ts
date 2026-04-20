import {inject, Injectable} from '@angular/core';
import {Question} from '../models/question.model';
import {SessionToken} from '../models/session-token.model';
import {SessionTokenService} from './session-token.service';
import questionsData from '../data/questions.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionRepositoryService {
  private readonly questions: Question[] = questionsData;
  private readonly tokenService = inject(SessionTokenService);


  /**
   * Returns a random question not seen within the last 60 days.
   * Returns null if every question has been seen recently.
   */
  getQuestionForSession(token: SessionToken): Question | null {
    const recentIds = this.tokenService.getRecentQuestionIds(token);
    const pool = this.questions.filter((q) => !recentIds.has(q.id));
    if (pool.length === 0) {
      return null;
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

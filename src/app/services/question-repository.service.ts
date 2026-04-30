import {inject, Injectable} from '@angular/core';
import {Question} from '../models/question.model';
import {SessionToken} from '../models/session-token.model';
import {SessionTokenService} from './session-token.service';

import controlFlow from '../data/questions-control-flow.json';
import arithmetic from '../data/questions-arithmetic.json';
import strings from '../data/questions-strings.json';
import operators from '../data/questions-operators.json';
import booleans from '../data/questions-booleans.json';
import loops from '../data/questions-loops.json';
import arrays from '../data/questions-arrays.json';
import types from '../data/questions-types.json';
import methods from '../data/questions-methods.json';
import oop from '../data/questions-oop.json';
import inheritance from '../data/questions-inheritance.json';
import interfaces from '../data/questions-interfaces.json';
import exceptions from '../data/questions-exceptions.json';
import collections from '../data/questions-collections.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionRepositoryService {
  private readonly questions: Question[] = [
    ...controlFlow,
    ...arithmetic,
    ...strings,
    ...operators,
    ...booleans,
    ...loops,
    ...arrays,
    ...types,
    ...methods,
    ...oop,
    ...inheritance,
    ...interfaces,
    ...exceptions,
    ...collections,
  ];
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

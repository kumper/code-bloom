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

export const CATEGORY_ORDER: string[] = [
  'types',
  'booleans',
  'arithmetic',
  'operators',
  'strings',
  'control-flow',
  'loops',
  'arrays',
  'methods',
  'oop',
  'inheritance',
  'interfaces',
  'exceptions',
  'collections',
];

@Injectable({
  providedIn: 'root',
})
export class QuestionRepositoryService {
  private readonly questions: Question[] = [
    ...types,
    ...booleans,
    ...arithmetic,
    ...operators,
    ...strings,
    ...controlFlow,
    ...loops,
    ...arrays,
    ...methods,
    ...oop,
    ...inheritance,
    ...interfaces,
    ...exceptions,
    ...collections,
  ];
  private readonly tokenService = inject(SessionTokenService);

  /**
   * Returns a question for the session. When category is specified, picks randomly
   * from that category. Otherwise follows difficulty progression — serves from the
   * lowest-difficulty category that still has unseen questions.
   */
  getQuestionForSession(token: SessionToken, category?: string): Question | null {
    const recentIds = this.tokenService.getRecentQuestionIds(token);

    if (category) {
      const pool = this.questions.filter(
        (q) => !recentIds.has(q.id) && q.tags?.includes(`#${category}`),
      );
      return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
    }

    // Progressive difficulty: find first category with available questions
    for (const cat of CATEGORY_ORDER) {
      const pool = this.questions.filter(
        (q) => !recentIds.has(q.id) && q.tags?.includes(`#${cat}`),
      );
      if (pool.length > 0) {
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    return null;
  }

  /**
   * Gets the category (tag without #) for a given question.
   */
  getQuestionCategory(question: Question): string | null {
    const tag = question.tags?.[0];
    return tag ? tag.replace('#', '') : null;
  }
}

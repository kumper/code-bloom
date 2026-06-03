import {inject, Injectable} from '@angular/core';
import {SessionToken} from '../models/session-token.model';
import {Question} from '../models/question.model';
import {DAILY_LIMIT, SessionTokenService} from './session-token.service';
import {QuestionRepositoryService} from './question-repository.service';

export type QuizState = 'blooming' | 'limit-reached' | 'category-intro' | 'question' | 'answered';

export interface LimitReacheInfo {
  isDailyLimit: boolean;
}

@Injectable({providedIn: 'root'})
export class QuizService {
  private readonly tokenService = inject(SessionTokenService);
  private readonly questionRepo = inject(QuestionRepositoryService);

  readonly dailyLimit = DAILY_LIMIT;

  /**
   * Processes an answer submission and updates the token
   */
  processAnswer(token: SessionToken, question: Question, selectedAnswer: string): {
    updated: SessionToken;
    correct: boolean;
  } {
    const correct = selectedAnswer === question.correctAnswer;
    const updated = this.tokenService.recordAnswer(token, question.id, correct);
    return {updated, correct};
  }

  /**
   * Attempts to load the next question
   * Returns the question and state info, or indicates limit is reached
   */
  loadNextQuestion(token: SessionToken, streakCategory?: string): {
    question: Question | null;
    limitReached: LimitReacheInfo | null;
    updatedToken: SessionToken;
  } {
    // Check if daily limit reached
    if (this.tokenService.isDailyLimitReached(token)) {
      return {
        question: null,
        limitReached: {isDailyLimit: true},
        updatedToken: token
      };
    }

    const category = streakCategory ?? token.categoryStreak?.category ?? undefined;
    const question = this.questionRepo.getQuestionForSession(token, category);

    // If no question found and we had a streak, clear it and try again
    if (!question && token.categoryStreak) {
      const clearedToken = {...token, categoryStreak: null};
      return this.loadNextQuestion(clearedToken);
    }

    // All questions exhausted
    if (!question) {
      return {
        question: null,
        limitReached: {isDailyLimit: false},
        updatedToken: token
      };
    }

    return {
      question,
      limitReached: null,
      updatedToken: token
    };
  }

  /**
   * Checks if category is new and should show intro
   */
  isCategoryNew(token: SessionToken, question: Question): boolean {
    const category = this.questionRepo.getQuestionCategory(question);
    return category ? this.tokenService.isCategoryNew(token, category) : false;
  }

  /**
   * Processes the category intro dismissal and updates token state
   */
  processCategoryIntroDismissal(token: SessionToken, question: Question, onDemand: boolean): SessionToken {
    const category = this.questionRepo.getQuestionCategory(question);
    if (!category || onDemand) {
      return token;
    }

    let updated = this.tokenService.markCategorySeen(token, category);
    updated = this.tokenService.startCategoryStreak(updated, category);
    updated = this.tokenService.recordQuestionSeen(updated, question.id);
    updated = this.tokenService.decrementStreak(updated);
    return updated;
  }

  /**
   * Records a question as seen and adjusts streak if needed
   */
  recordQuestionView(token: SessionToken, question: Question): SessionToken {
    let updated = this.tokenService.recordQuestionSeen(token, question.id);
    if (token.categoryStreak) {
      updated = this.tokenService.decrementStreak(updated);
    }
    return updated;
  }

  /**
   * Gets the category from a question
   */
  getQuestionCategory(question: Question): string | null {
    return this.questionRepo.getQuestionCategory(question) ?? null;
  }
}


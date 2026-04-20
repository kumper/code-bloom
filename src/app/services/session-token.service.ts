import {Injectable} from '@angular/core';
import {HistoryEntry, SessionToken} from '../models/session-token.model';

export const DAILY_LIMIT = 5;
export const HISTORY_WINDOW_DAYS = 60;
const TOKEN_VERSION = 1;

@Injectable({providedIn: 'root'})
export class SessionTokenService {
  createToken(name: string): SessionToken {
    return {
      version: TOKEN_VERSION,
      name: name.trim(),
      totalPoints: 0,
      dailyProgress: {
        date: this.today(),
        exercisesCompletedToday: 0,
      },
      history: [],
    };
  }

  encode(token: SessionToken): string {
    const pruned = this.pruneHistory(token);
    const json = JSON.stringify(pruned);
    const bytes = new TextEncoder().encode(json);
    const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
    return btoa(binary);
  }

  decode(raw: string): SessionToken | null {
    try {
      const binary = atob(raw);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const json = new TextDecoder().decode(bytes);
      const parsed = JSON.parse(json) as SessionToken;
      if (parsed.version !== TOKEN_VERSION) {
        return null;
      }
      return this.migrateDailyProgress(parsed);
    } catch {
      return null;
    }
  }

  /**
   * Resets the daily counter if the stored date is not today.
   */
  private migrateDailyProgress(token: SessionToken): SessionToken {
    if (token.dailyProgress.date !== this.today()) {
      return {
        ...token,
        dailyProgress: {
          date: this.today(),
          exercisesCompletedToday: 0,
        },
      };
    }
    return token;
  }

  isDailyLimitReached(token: SessionToken): boolean {
    return token.dailyProgress.exercisesCompletedToday >= DAILY_LIMIT;
  }

  /**
   * Records that a question was shown. Adds a new history entry or updates
   * lastSeenOn if the question already exists in history.
   */
  recordQuestionSeen(token: SessionToken, questionId: number): SessionToken {
    const today = this.today();
    const existing = token.history.find((e) => e.questionId === questionId);
    let history: HistoryEntry[];

    if (existing) {
      history = token.history.map((e) =>
        e.questionId === questionId ? {...e, lastSeenOn: today} : e,
      );
    } else {
      history = [
        ...token.history,
        {
          questionId,
          firstSeenOn: today,
          lastSeenOn: today,
          correctCount: 0,
          wrongCount: 0,
        },
      ];
    }

    return {
      ...token,
      dailyProgress: {
        ...token.dailyProgress,
        exercisesCompletedToday: token.dailyProgress.exercisesCompletedToday + 1,
      },
      history,
    };
  }

  /**
   * Records the result of an answer submission.
   * Awards 1 point for a correct answer.
   */
  recordAnswer(token: SessionToken, questionId: number, correct: boolean): SessionToken {
    const history = token.history.map((e) =>
      e.questionId === questionId
        ? {
          ...e,
          correctCount: correct ? e.correctCount + 1 : e.correctCount,
          wrongCount: correct ? e.wrongCount : e.wrongCount + 1,
        }
        : e,
    );

    return {
      ...token,
      totalPoints: correct ? token.totalPoints + 1 : token.totalPoints,
      history,
    };
  }

  private pruneHistory(token: SessionToken): SessionToken {
    const cutoff = this.daysAgo(HISTORY_WINDOW_DAYS);
    return {
      ...token,
      history: token.history.filter((e) => e.lastSeenOn >= cutoff),
    };
  }

  /** Returns Set of questionIds seen within the last 60 days. */
  getRecentQuestionIds(token: SessionToken): Set<number> {
    const cutoff = this.daysAgo(HISTORY_WINDOW_DAYS);
    return new Set(
      token.history.filter((e) => e.lastSeenOn >= cutoff).map((e) => e.questionId),
    );
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private daysAgo(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
  }
}



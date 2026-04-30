export interface HistoryEntry {
  questionId: number;
  firstSeenOn: string; // 'YYYY-MM-DD'
  lastSeenOn: string;  // 'YYYY-MM-DD'
  correctCount: number;
  wrongCount: number;
}

export interface DailyProgress {
  date: string; // 'YYYY-MM-DD'
  exercisesCompletedToday: number; // 0–5
}

export interface CategoryStreak {
  category: string; // category tag without #, e.g. 'loops'
  remaining: number; // how many more questions to serve from this category (starts at 3, decrements)
}

export interface SessionToken {
  version: number;
  name: string;
  totalPoints: number;
  dailyProgress: DailyProgress;
  history: HistoryEntry[];
  seenCategories: string[];
  categoryStreak: CategoryStreak | null;
}


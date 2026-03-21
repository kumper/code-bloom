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

export interface SessionToken {
  version: number;
  name: string;
  totalPoints: number;
  dailyProgress: DailyProgress;
  history: HistoryEntry[];
}


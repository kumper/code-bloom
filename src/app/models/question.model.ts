import {QuizAnswer} from './quiz-answer.model';

export interface Question {
  id: number;
  questionEN: string;
  questionPL: string;
  codeSnippetEN: string;
  codeSnippetPL: string;
  answers: QuizAnswer[];
  correctAnswer: string;
  tags?: string[];
}

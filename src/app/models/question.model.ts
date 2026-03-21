import {QuizAnswer} from '../components/question/question';

export interface Question {
  id: number;
  question: string;
  codeSnippet: string;
  answers: QuizAnswer[];
  correctAnswer: string;
  tags?: string[];
}

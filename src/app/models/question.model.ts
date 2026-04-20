import {QuizAnswer} from '../components/question/question';

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

import {Injectable} from '@angular/core';
import {Question} from '../models/question.model';
import questionsData from '../data/questions.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionRepositoryService {
  private readonly questions: Question[] = questionsData;

  getRandomQuestion(): Question {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return this.questions[randomIndex];
  }
}

import {Component} from '@angular/core';
import {GenericFrameComponent} from './components/generic-frame/generic-frame';
import {QuestionComponent, QuizAnswer, QuizSubmission} from './components/question/question';

@Component({
  selector: 'app-root',
  imports: [GenericFrameComponent, QuestionComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  codeExample = `int a = 3;
if (a > 0) {
  System.out.println("'a' is positive");
}`;

  quizAnswers: QuizAnswer[] = [
    {label: 'a', text: 'Output: nothing'},
    {label: 'b', text: "Output: 'a' is positive"},
    {label: 'c', text: 'Compilation error'}
  ];

  handleSave(submission: QuizSubmission): void {
    console.log('Question:', submission.questionNumber);
    console.log('Selected answer:', submission.selectedAnswer);

    // Add your logic here (e.g., check answer, show result, navigate to next question)
    if (submission.selectedAnswer === 'b') {
      alert('✅ Correct! The output will be: \'a\' is positive');
    } else {
      alert('❌ Incorrect. Try again!');
    }
  }
}

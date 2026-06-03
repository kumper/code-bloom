import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuestionCardComponent} from './question-card';
import {QuizSubmission} from '../../models/quiz-answer.model';

describe('QuestionCardComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('questionNumber', 1);
    fixture.componentRef.setInput('question', 'Test question');
    fixture.componentRef.setInput('codeSnippet', 'code');
    fixture.componentRef.setInput('answers', [
      {label: 'A', textEN: 'Answer A', textPL: 'Odpowiedź A'},
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset selected answer when question number changes', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('questionNumber', 1);
      fixture.componentRef.setInput('question', 'Test question');
      fixture.componentRef.setInput('codeSnippet', 'code');
      fixture.componentRef.setInput('answers', [
        {label: 'A', textEN: 'Answer A', textPL: 'Odpowiedź A'},
      ]);
      fixture.detectChanges();

      component.selectedAnswerValue.set('A');
      expect(component.selectedAnswerValue()).toBe('A');

      fixture.componentRef.setInput('questionNumber', 2);
      fixture.detectChanges();

      expect(component.selectedAnswerValue()).toBe('');
    });
  });

  it('should emit save event when onSubmit is called with a selected answer', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('questionNumber', 1);
      fixture.componentRef.setInput('question', 'Test question');
      fixture.componentRef.setInput('codeSnippet', 'code');
      fixture.componentRef.setInput('answers', [
        {label: 'A', textEN: 'Answer A', textPL: 'Odpowiedź A'},
      ]);
      fixture.detectChanges();

      let emittedEvent: QuizSubmission | undefined;
      component.save.subscribe((event) => {
        emittedEvent = event;
      });

      component.selectedAnswerValue.set('A');
      component.onSubmit();

      expect(emittedEvent).toBeDefined();
      if (!emittedEvent) {
        throw new Error('Expected save event to be emitted');
      }
      const submission = emittedEvent;
      expect(submission.questionNumber).toBe(1);
      expect(submission.selectedAnswer).toBe('A');
    });
  });

  it('should not emit save event when onSubmit is called without a selected answer', () => {
    let emitted = false;
    component.save.subscribe(() => {
      emitted = true;
    });

    component.onSubmit();
    expect(emitted).toBeFalsy();
  });
});






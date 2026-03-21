import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionComponent, QuizSubmission} from './question';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('questionNumber', 1);
    fixture.componentRef.setInput('question', 'What is 2 + 2?');
    fixture.componentRef.setInput('codeSnippet', 'int x = 2 + 2;');
    fixture.componentRef.setInput('answers', [
      {label: 'a', text: '3'},
      {label: 'b', text: '4'},
    ]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit save when no answer is selected', () => {
    const emitted: QuizSubmission[] = [];
    component.save.subscribe((v: QuizSubmission) => emitted.push(v));
    component.onSubmit();
    expect(emitted.length).toBe(0);
  });

  it('should emit save with correct data when an answer is selected', () => {
    const emitted: QuizSubmission[] = [];
    component.save.subscribe((v: QuizSubmission) => emitted.push(v));
    component.selectedAnswerValue = 'b';
    component.onSubmit();
    expect(emitted.length).toBe(1);
    expect(emitted[0]).toEqual({questionNumber: 1, selectedAnswer: 'b'});
  });

  it('should update selectedAnswerValue on answer change', () => {
    component.selectedAnswerValue = 'a';
    component.onAnswerChange();
    expect(component.selectedAnswerValue).toBe('a');
  });
});

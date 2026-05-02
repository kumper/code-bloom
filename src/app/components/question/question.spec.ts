import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuestionComponent} from './question';
import {QuizSubmission} from '../../models/quiz-answer.model';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('questionNumber', 1);
    fixture.componentRef.setInput('question', 'What is 2 + 2?');
    fixture.componentRef.setInput('codeSnippet', 'int x = 2 + 2;');
    fixture.componentRef.setInput('answers', [
      {label: 'a', textEN: '3', textPL: '3'},
      {label: 'b', textEN: '4', textPL: '4'},
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
    component.selectedAnswerValue.set('b');
    component.onSubmit();
    expect(emitted.length).toBe(1);
    expect(emitted[0]).toEqual({questionNumber: 1, selectedAnswer: 'b'});
  });

  it('should update selectedAnswerValue when set via signal', () => {
    component.selectedAnswerValue.set('a');
    expect(component.selectedAnswerValue()).toBe('a');
  });

  it('should emit tagClick when a tag button is clicked', async () => {
    const emitted: string[] = [];
    component.tagClick.subscribe(tag => emitted.push(tag));
    fixture.componentRef.setInput('tags', ['#arrays']);
    await fixture.whenStable();
    fixture.detectChanges();

    const tagButton = fixture.nativeElement.querySelector('.question__tag') as HTMLButtonElement;
    tagButton.click();

    expect(emitted).toEqual(['#arrays']);
  });

  it('should always render the feedback link regardless of tags', async () => {
    fixture.componentRef.setInput('tags', []);
    await fixture.whenStable();
    fixture.detectChanges();

    const feedbackLink = fixture.nativeElement.querySelector('a[aria-label="Send feedback about CodeBloom"]') as HTMLAnchorElement;
    expect(feedbackLink).toBeTruthy();
  });

  it('should render feedback link with a valid mailto href', async () => {
    fixture.detectChanges();
    const feedbackLink = fixture.nativeElement.querySelector('a[aria-label="Send feedback about CodeBloom"]') as HTMLAnchorElement;
    expect(feedbackLink.href).toContain('mailto:');
    expect(feedbackLink.href).toContain('subject=');
    expect(feedbackLink.href).toContain('body=');
  });
});

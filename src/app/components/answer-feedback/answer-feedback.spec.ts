import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AnswerFeedbackComponent} from './answer-feedback';
import {LanguageService} from '../../services/language.service';

describe('AnswerFeedbackComponent', () => {
  let component: AnswerFeedbackComponent;
  let fixture: ComponentFixture<AnswerFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnswerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isCorrect', true);
    fixture.componentRef.setInput('correctAnswer', 'A');
    fixture.componentRef.setInput('showNextButton', true);
    fixture.componentRef.setInput('explainUrl', 'http://example.com');
    fixture.componentRef.setInput('dailyLimit', 5);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct feedback when isCorrect is true', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('isCorrect', true);
      fixture.componentRef.setInput('correctAnswer', 'A');
      fixture.componentRef.setInput('showNextButton', true);
      fixture.componentRef.setInput('explainUrl', 'http://example.com');
      fixture.componentRef.setInput('dailyLimit', 5);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h3');
      const langService = TestBed.inject(LanguageService);
      expect(heading.textContent).toContain(langService.t('quiz.correct.heading'));
    });
  });

  it('should display wrong feedback when isCorrect is false', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('isCorrect', false);
      fixture.componentRef.setInput('correctAnswer', 'B');
      fixture.componentRef.setInput('showNextButton', true);
      fixture.componentRef.setInput('explainUrl', 'http://example.com');
      fixture.componentRef.setInput('dailyLimit', 5);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h3');
      const langService = TestBed.inject(LanguageService);
      expect(heading.textContent).toContain(langService.t('quiz.wrong.heading'));
    });
  });

  it('should emit nextQuestion when next button is clicked', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('isCorrect', true);
      fixture.componentRef.setInput('correctAnswer', 'A');
      fixture.componentRef.setInput('showNextButton', true);
      fixture.componentRef.setInput('explainUrl', 'http://example.com');
      fixture.componentRef.setInput('dailyLimit', 5);
      fixture.detectChanges();

      let emitted = false;
      component.nextQuestion.subscribe(() => {
        emitted = true;
      });

      const nextButton = fixture.nativeElement.querySelector('button');
      nextButton.click();

      expect(emitted).toBeTruthy();
    });
  });
});





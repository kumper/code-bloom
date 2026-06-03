import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LimitReachedComponent} from './limit-reached';
import {LanguageService} from '../../services/language.service';

describe('LimitReachedComponent', () => {
  let component: LimitReachedComponent;
  let fixture: ComponentFixture<LimitReachedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitReachedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LimitReachedComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isDailyLimit', true);
    fixture.componentRef.setInput('userName', 'John');
    fixture.componentRef.setInput('totalPoints', 100);
    fixture.componentRef.setInput('dailyLimit', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display daily limit message when isDailyLimit is true', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('isDailyLimit', true);
      fixture.componentRef.setInput('userName', 'John');
      fixture.componentRef.setInput('totalPoints', 100);
      fixture.componentRef.setInput('dailyLimit', 10);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h2');
      const langService = TestBed.inject(LanguageService);
      expect(heading.textContent).toContain(langService.t('quiz.dailyLimit.heading', {name: 'John'}));
      expect(heading.textContent).toContain('John');

      const paragraph = fixture.nativeElement.querySelector('p');
      expect(paragraph.textContent).toContain(langService.t('quiz.dailyLimit.subtitle', {limit: '10'}));
    });
  });

  it('should display all-exhausted message when isDailyLimit is false', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('isDailyLimit', false);
      fixture.componentRef.setInput('userName', 'Jane');
      fixture.componentRef.setInput('totalPoints', 200);
      fixture.componentRef.setInput('dailyLimit', 10);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h2');
      const langService = TestBed.inject(LanguageService);
      expect(heading.textContent).toContain(langService.t('quiz.allExhausted.heading', {name: 'Jane'}));
      expect(heading.textContent).toContain('Jane');

      const paragraph = fixture.nativeElement.querySelector('p');
      expect(paragraph.textContent).toContain(langService.t('quiz.allExhausted.subtitle'));
    });
  });

  it('should display correct total points', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('isDailyLimit', true);
      fixture.componentRef.setInput('userName', 'John');
      fixture.componentRef.setInput('totalPoints', 500);
      fixture.componentRef.setInput('dailyLimit', 10);
      fixture.detectChanges();

      const pointsValue = fixture.nativeElement.querySelector('.limit-reached__points-value');
      expect(pointsValue.textContent).toContain('500');
    });
  });
});




import {TestBed} from '@angular/core/testing';
import {App} from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the welcome screen', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-welcome')).toBeTruthy();
  });

  it('should load a question from the repository service', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const question = app.currentQuestion();
    expect(question).toBeTruthy();
    expect(question.question).toBeDefined();
    expect(question.answers.length).toBeGreaterThan(0);
  });
});


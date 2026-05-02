import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';

import {WelcomeComponent} from './welcome';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a username input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input#username')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="button"]');
    expect(button).toBeTruthy();
  });

  it('should not crash on submit', () => {
    expect(() => component.onSubmit()).not.toThrow();
  });

  it('should render all 5 rules', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const rules = compiled.querySelectorAll('.text-secondary-emphasis > div');
    expect(rules.length).toBe(5);
  });

  it('should render the explain button example in rule 3', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const divs = Array.from(compiled.querySelectorAll('.text-secondary-emphasis > div'));
    const rule3 = divs[2];
    expect(rule3.querySelector('a')).toBeTruthy();
  });
});

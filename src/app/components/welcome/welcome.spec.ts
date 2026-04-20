import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
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
});

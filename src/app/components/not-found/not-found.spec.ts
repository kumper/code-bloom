import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {NotFoundComponent} from './not-found';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;
  let component: NotFoundComponent;
  let router: Router;

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([{path: '', component: NotFoundComponent}])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start countdown at 3', () => {
    expect(component.secondsLeft()).toBe(3);
  });

  it('should decrement secondsLeft every second', async () => {
    await vi.advanceTimersByTimeAsync(1000);
    fixture.detectChanges();
    expect(component.secondsLeft()).toBe(2);

    await vi.advanceTimersByTimeAsync(1000);
    fixture.detectChanges();
    expect(component.secondsLeft()).toBe(1);
  });

  it('should navigate to / after 3 seconds', async () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    await vi.advanceTimersByTimeAsync(3000);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['/'], {replaceUrl: true});
  });
});


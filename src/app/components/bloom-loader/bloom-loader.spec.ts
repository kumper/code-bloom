import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BloomLoaderComponent} from './bloom-loader';

describe('BloomLoaderComponent', () => {
  let fixture: ComponentFixture<BloomLoaderComponent>;
  let component: BloomLoaderComponent;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  async function setup() {
    await TestBed.configureTestingModule({
      imports: [BloomLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BloomLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  it('should render the SVG tree with 5 branches', async () => {
    await setup();
    const branches = fixture.nativeElement.querySelectorAll('.bloom__branch');
    expect(branches.length).toBe(5);
  });

  it('should emit done after 5 seconds', async () => {
    const spy = vi.fn();
    await setup();
    component.done.subscribe(spy);

    vi.advanceTimersByTime(4999);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

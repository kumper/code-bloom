import {ComponentFixture, TestBed} from '@angular/core/testing';
import {vi} from 'vitest';
import {CategoryIntroComponent} from './category-intro';

describe('CategoryIntroComponent', () => {
  let fixture: ComponentFixture<CategoryIntroComponent>;

  async function setup(inputs: {title: string; body: string; dismissible?: boolean}) {
    await TestBed.configureTestingModule({
      imports: [CategoryIntroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryIntroComponent);
    fixture.componentRef.setInput('title', inputs.title);
    fixture.componentRef.setInput('body', inputs.body);
    if (inputs.dismissible !== undefined) {
      fixture.componentRef.setInput('dismissible', inputs.dismissible);
    }
    fixture.detectChanges();
  }

  it('should display title and body', async () => {
    await setup({title: 'Loops', body: 'Loops repeat code.'});
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.intro__title')?.textContent).toContain('Loops');
    expect(el.querySelector('.intro__body')?.textContent).toContain('Loops repeat code.');
  });

  it('should show dismiss button when dismissible', async () => {
    await setup({title: 'T', body: 'B', dismissible: true});
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
  });

  it('should hide dismiss button when not dismissible', async () => {
    await setup({title: 'T', body: 'B', dismissible: false});
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('should emit dismiss on button click', async () => {
    const spy = vi.fn();
    await setup({title: 'T', body: 'B'});
    fixture.componentInstance.dismiss.subscribe(spy);
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalled();
  });
});

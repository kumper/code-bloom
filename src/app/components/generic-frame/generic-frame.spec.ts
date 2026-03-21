import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenericFrameComponent} from './generic-frame';

describe('QuizCardComponent', () => {
  let component: GenericFrameComponent;
  let fixture: ComponentFixture<GenericFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericFrameComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenericFrameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

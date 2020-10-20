import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStarRatingComponent } from './input-star-rating.component';


describe('InputStarRatingComponent', () => {
  let component: InputStarRatingComponent;
  let fixture: ComponentFixture<InputStarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputStarRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

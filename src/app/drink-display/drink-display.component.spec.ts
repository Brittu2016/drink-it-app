import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkDisplayComponent } from './drink-display.component';

describe('DrinkDisplayComponent', () => {
  let component: DrinkDisplayComponent;
  let fixture: ComponentFixture<DrinkDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

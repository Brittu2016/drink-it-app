import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkSearchComponent } from './drink-search.component';

describe('DrinkSearchComponent', () => {
  let component: DrinkSearchComponent;
  let fixture: ComponentFixture<DrinkSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

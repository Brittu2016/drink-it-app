import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResultAlertComponent } from './no-result-alert.component';

describe('NoResultAlertComponent', () => {
  let component: NoResultAlertComponent;
  let fixture: ComponentFixture<NoResultAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoResultAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResultAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

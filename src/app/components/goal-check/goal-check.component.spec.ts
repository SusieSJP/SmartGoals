import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCheckComponent } from './goal-check.component';

describe('GoalCheckComponent', () => {
  let component: GoalCheckComponent;
  let fixture: ComponentFixture<GoalCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

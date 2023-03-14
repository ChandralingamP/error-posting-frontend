import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamQuestionCardComponent } from './team-question-card.component';

describe('TeamQuestionCardComponent', () => {
  let component: TeamQuestionCardComponent;
  let fixture: ComponentFixture<TeamQuestionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamQuestionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

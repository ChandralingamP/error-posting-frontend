import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPostQuestionComponent } from './team-post-question.component';

describe('TeamPostQuestionComponent', () => {
  let component: TeamPostQuestionComponent;
  let fixture: ComponentFixture<TeamPostQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPostQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPostQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

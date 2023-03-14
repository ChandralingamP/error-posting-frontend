import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAnswerComponent } from './team-answer.component';

describe('TeamAnswerComponent', () => {
  let component: TeamAnswerComponent;
  let fixture: ComponentFixture<TeamAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

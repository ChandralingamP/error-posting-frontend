import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddMembersComponent } from './team-add-members.component';

describe('TeamAddMembersComponent', () => {
  let component: TeamAddMembersComponent;
  let fixture: ComponentFixture<TeamAddMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAddMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAddMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTagsComponent } from './team-tags.component';

describe('TeamTagsComponent', () => {
  let component: TeamTagsComponent;
  let fixture: ComponentFixture<TeamTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

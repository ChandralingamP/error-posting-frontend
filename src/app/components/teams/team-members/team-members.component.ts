import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html'
})
export class TeamMembersComponent implements OnInit {
  teamId: string | undefined
  inviteLink: string = 'http://localhost:5005/team/join/'
  constructor(public service: TeamService, public storage: StorageService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id')!
    this.inviteLink = this.inviteLink + this.teamId;
    if (!this.service.members) {
      this.service.getMembers(this.teamId);
    }
  }
  toggleAddMembers() {
    this.storage.toggleMenu = 'hidden'
    this.storage.toggleTeamMenu = 'hidden'
    this.storage.closeMenu = false;
    this.service.addMemberToggle = true;
  }
  navto(memberId: String) {
    this.storage.closeMenu = false;
    if (memberId === 'home') {
      this.storage.toggleMenu = 'hidden'
      this.storage.toggleTeamMenu = 'hidden'
      this.router.navigate(['/']);
    }
    else {
      this.storage.toggleMenu = 'hidden'
      this.storage.toggleTeamMenu = 'hidden'
      this.router.navigate(['/team/question/' + this.teamId + '/' + memberId]);
    }
  }
  copied() {
    alert("link copied Share with your team members");
  }


}

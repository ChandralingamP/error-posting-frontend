import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Question } from 'src/app/interface/interface.model';
import { Team } from 'src/app/interface/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UsersService } from 'src/app/services/users.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit {
  teamId: string | undefined
  memberId: String | undefined
  tag: String | undefined
  paramsSub: Subscription | undefined
  constructor(public userService: UsersService,public teamService: TeamService, private route: ActivatedRoute) { }
  ngOnInit() {
    try {
      this.paramsSub = this.route.params.subscribe(params => {
        this.teamId = params['id'];
        if(!this.teamService.teamId){
          this.teamService.getTeam(this.teamId!);
        }
        this.tag = params['tag'];
        this.memberId = params['uid'];
        console.log(this.teamId, this.memberId, this.tag,"frtyuikjtyuj");
        if (this.teamId) {
          if (this.tag) {
            this.teamService.getTaggedQuestion(this.teamId, this.tag);
          } else if (this.memberId) {
            console.log(this.memberId);
            this.teamService.getMembersQuestions(this.teamId, this.memberId);
          } else {
            this.teamService.getTeam(this.teamId);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent {
  userId : String | undefined
  teamId: String | undefined
  memberId: String | undefined
  constructor(public service: TeamService, private route: ActivatedRoute,private router : Router) { }
  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id')!
    this.userId = JSON.parse(localStorage.getItem('user')!)
    this.memberId = this.route.snapshot.paramMap.get('uid')!
  }
  getNew() {
    if (this.teamId) {
      if (this.memberId) {
        this.service.getMembersNewQuestion(this.teamId,this.memberId);
      }
      this.service.getNewQuestion(this.teamId);
    }
  }
  // getVotes() {
  //   if (this.teamId) {
  //     if (this.memberId) {
  //       this.service.getMemberHighVotesQuestion(this.teamId,this.memberId);
  //     }
  //     this.service.getHighVotesQuestion(this.teamId);
  //   }
  // }
  getUnanswered() {
    if (this.teamId) {
      if (this.memberId) {
        this.service.getMembersUnAnsweredQuestion(this.teamId,this.memberId);
      }
      this.service.getUnAnsweredQuestion(this.teamId);
    }
  }
  getViewsQuestion() {
    console.log(this.teamId, this.memberId);

    if (this.teamId){
      console.log(this.teamId, this.memberId);
      if (this.memberId) {
        console.log(this.teamId, this.memberId);
        this.service.getMemberHighViewsQuestion(this.teamId,this.memberId);
      }
      this.service.getHighViewsQuestion(this.teamId);
    }
  }
  navTo(){
    this.service.toggleMenu = true;
    this.router.navigate(['team/post-questions/'+this.teamId+'/'+this.userId]);
  }
}

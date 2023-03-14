import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/interface/interface.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-question-card',
  templateUrl: './team-question-card.component.html'
})
export class TeamQuestionCardComponent implements OnInit {
  teamId: String | undefined
  @Input() question: Question | undefined
  constructor(private router: Router, private route: ActivatedRoute, private service: TeamService) { }
  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id')!
  }
  getTime() {
    console.log(this.question);
    return 32
  }
  getUser(id: any) {
    const name = this.service.members?.filter((obj: any) => {
      if (obj._id == id) {
        if (obj.userName) {
          return obj.userName;
        }
      }
    });
    if (name) {
      return name[0].userName;
    } else {
      return '';
    }
  }
  navTo(qid: string) {
    if (this.question) {
      let uri = '/team/answer/' + this.teamId + '/' + qid;
      this.router.navigate([uri]);
    }
  }
  navToDashboard(uri: any) {
    this.router.navigate([uri]);
  }

}

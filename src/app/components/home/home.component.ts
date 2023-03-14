import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/interface/interface.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { TeamService } from 'src/app/services/team.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  questions: Array<Question> | undefined
  tag: string | undefined
  constructor(public service: QuestionsService, private http: HttpClient, private route: ActivatedRoute, public teamService: TeamService) { }
  ngOnInit(): void {
    this.tag = this.route.snapshot.paramMap.get('tag')!;
    this.service.getAllQuestion();
    this.http.get("https://errorbackend-1-w2618457.deta.app").subscribe((data) => console.log(data)
    );
  }
  getNew() {
    this.service.getNewQuestion();
  }
  getViews() {
    this.service.getHighViewsQuestion();
  }
  getVotes() {
    this.service.getHighVotesQuestion();
  }
  getUnanswered() {
    this.service.getUnAnsweredQuestion();
  }
}

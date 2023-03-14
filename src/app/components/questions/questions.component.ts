import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {
  tag: string | undefined
  paramsSub: Subscription | undefined
  constructor(public service: QuestionsService, private route: ActivatedRoute,public teamService : TeamService,private router : Router) { }
  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.tag = params['tag'];

      if(this.tag == "c#"){
        this.service.getTaggedQuestion("cs");
      }
      else if (this.tag) {
        this.service.getTaggedQuestion(this.tag);
      } else {
        this.service.getAllQuestion();
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub?.unsubscribe();
  }

  navTo(){
    this.teamService.toggleMenu = false;
    this.router.navigate(['/post-questions/'])
  }
  getNew() {
    if(this.tag == "c#"){
      this.service.getNewQuestionTag("c#");
    }
    else if (this.tag) {
      this.service.getNewQuestionTag(this.tag);
    } else {
      this.service.getNewQuestion();
    }
  }
  getViews() {
    if(this.tag == "c#"){
      this.service.getHighViewsQuestionTag("c#");
    }
    else if (this.tag) {
      this.service.getHighViewsQuestionTag(this.tag);
    } else {
      this.service.getHighViewsQuestion();
    }
  }
  getVotes() {
    if(this.tag == "c#"){
      this.service.getHighVotesQuestionTag("c#");
    }
    else if (this.tag) {
      this.service.getHighVotesQuestionTag(this.tag);
    } else {
      this.service.getHighVotesQuestion();
    }

  }
  getUnanswered() {
    if(this.tag == "c#"){
      this.service.getUnAnsweredQuestionTag("c#");
    }
    else if (this.tag) {
      this.service.getUnAnsweredQuestionTag(this.tag);
    } else {
      this.service.getUnAnsweredQuestion();
    }

  }
}

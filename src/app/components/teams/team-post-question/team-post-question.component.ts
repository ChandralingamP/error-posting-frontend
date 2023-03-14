
import { Component, OnInit } from '@angular/core';
import { globalTags } from 'src/app/services/globalconstants'
import { Questions } from 'src/app/interface/interface.model';
import { WebService } from 'src/app/web.service';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { newQuestion } from 'src/app/interface/team.model';

@Component({
  selector: 'app-team-post-question',
  templateUrl: './team-post-question.component.html'
})
export class TeamPostQuestionComponent implements OnInit {
  tag: String = '';
  teamId: String | undefined
  copyChecker: boolean = false;
  titleExist: boolean = false;
  descriptionValid: boolean = false;
  tagsValid: boolean = false;
  codeValid: boolean = false;
  reviewToggle: boolean = true;
  toggle: boolean = false;
  topTags: Array<string> = [];
  copyQuestions: Array<Questions> = [];
  question: newQuestion = {
    _id: '',
    userId: JSON.parse(localStorage.getItem('user')!),
    title: '',
    description: '',
    code: '',
    expectation: '',
    tags: [],
    createAt : ''
  }
  constructor(
    public service: TeamService,
    private route: ActivatedRoute,
    private router : Router
  ) { }
  async ngOnInit() {
    this.service.toggleMenu = true;
    this.teamId = this.route.snapshot.paramMap.get('id')!;
    this.question.userId = JSON.parse(localStorage.getItem('user')!);
  }
  toggleValid(val: string) {
    if (val == 'title') {
      this.titleExist = false;
    } else if (val == 'tag') {
      if (this.question.tags.length < 5) {
        this.tagsValid = false;
      } else {
        this.tagsValid = true;
      }
    }
  }
  reviewQuestion() {
    if (this.question.title.length > 10) {
      if(this.teamId){
        this.service.getExistQuestions(this.teamId,this.question.title);
        this.reviewToggle = false;
      }
    } else {
      this.titleExist = true;
      document.getElementById('title')?.focus();
    }
  }

  selectTags(val: any) {
    this.toggleValid('tag')
    if (!this.tagsValid) {
      if (!this.question.tags.includes(val)) {
        this.question.tags.push(val);
      }
    }
    this.tag = '';
    this.topTags = [];
  }
  searchTags() {
    if (this.tag == '') {
      this.topTags = []
    } else {
      if (this.tag.slice(-1) === ' ') {
        if (this.tag.length > 1) {
          this.selectTags(this.tag.slice(0, -1).trim());
        } else {
          this.tag = '';
        }
      } else {
        this.topTags = (globalTags.filter((obj) => obj.toLowerCase().includes(this.tag.toLowerCase()))).slice(0, 12);
      }
    }
    console.log(this.topTags);
  }
  removeTag(val: String) {
    this.question.tags = this.question.tags.filter((t) => t !== val)
  }
  getCopied() {
    const val = this.service.copyQuestion?.filter((obj) => obj.title === this.question.title)
    if (val?.length) {
      return true;
    } else {
      return false
    }
  }
  postQuestion() {
    if (this.getCopied() || (this.service.copyQuestion?.length !== 0 && this.copyChecker)) {
      this.titleExist = true;
      document.getElementById('title')?.focus();
      return;
    } else {
      this.titleExist = false;
    }
    if (this.question.description.length < 12) {
      this.descriptionValid = true;
      document.getElementById('description')?.focus();
      alert("Enter your description...");
      return;
    } else {
      this.descriptionValid = false
    }
    if (this.question.code.length < 12) {
      this.codeValid = true;
      document.getElementById('code')?.focus();
      return;
    } else {
      this.codeValid = false
    }
    if (!this.question.tags.length) {
      this.tagsValid = true;
      document.getElementById('tag')?.focus();
    }else {
      this.tagsValid = false;
    }
    if (this.teamId) {
      this.question.createAt = (new Date()).getTime().toString();
      this.question._id = 'id' + (new Date()).getTime();
      console.log(this.teamId, this.question);
      this.service.addQuestion(this.teamId, this.question);
    }
    this.router.navigate(['/team/'+this.teamId]);
  }
  toggler() {
    this.toggle = !this.toggle;
  }
}

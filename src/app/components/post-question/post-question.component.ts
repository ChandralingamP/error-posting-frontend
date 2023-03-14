import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import {globalTags} from 'src/app/services/globalconstants'
import { Questions } from 'src/app/interface/interface.model';
import { WebService } from 'src/app/web.service';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html'
})
export class PostQuestionComponent implements OnInit {
  tag : string = '';
  copyChecker : boolean = false;
  titleExist : boolean = false;
  descriptionValid : boolean = false;
  tagsValid : boolean = false;
  codeValid : boolean = false;
  reviewToggle : boolean = true;
  toggle : boolean = false;
  topTags : Array<string> = [];
  copyQuestions : Array<Questions> = [];
  question: Questions = {
      userId : JSON.parse(localStorage.getItem('user')!),
      userName : '',
      title:'',
      description :'',
      code : '',
      expectation : '',
      tags : [],
      views : 0,
      votes : []
  }
  constructor(
    public questionServices: QuestionsService,
    private webService : WebService,
    private router : Router,
    public teamService : TeamService
  ) { }
  async ngOnInit(){
    this.question.userId = JSON.parse(localStorage.getItem('user')!);
    if(this.question.userId){
      const t = `users/${this.question.userId}`;
      this.webService.get(`users/${this.question.userId}`).subscribe((data : any)=> {this.question.userName = data.userName;});
    }
   }
  toggleValid(val : string){
    if(val == 'title'){
      this.titleExist = false;
    }else if(val == 'tag'){
      if(this.question.tags.length < 5){
        this.tagsValid = false;
      }else{
        this.tagsValid = true;
      }
    }
  }
  reviewQuestion(){
    if(this.question.title.length > 10){
      this.questionServices.getExistQuestions(this.question.title);
      this.reviewToggle = false;
    }else{
      this.titleExist = true;
      document.getElementById('title')?.focus();
    }
  }
  topTagsF(){
    this.topTags = []
    this.tag = '';
  }
  selectTags(val :any){
    this.toggleValid('tag')
    if(!this.tagsValid){
      if(!this.question.tags.includes(val)){
        this.question.tags.push(val);
      }
    }
    this.tag = '';
    this.topTags = [];
  }
  searchTags(){
    if(this.tag == ''){
      this.topTags = []
    }else{
      if(this.tag.slice(-1) === ' '){
        if(this.tag.length > 1){
          this.selectTags(this.tag.slice(0,-1).trim());
        }else{
          this.tag = '';
        }
      }else{
        this.topTags = (globalTags.filter((obj) => obj.toLowerCase().includes(this.tag.toLowerCase()))).slice(0, 12);
      }
    }
  }
  removeTag(val :string){
    this.question.tags = this.question.tags.filter((t) => t!== val)
  }
  getCopied(){
    const val = this.questionServices.copyQuestion?.filter((obj)=> obj.title === this.question.title)
    console.log(val);

    if(val?.length){
      return true;
    }else{
      return false
    }
  }
  postQuestion(){
    if(this.getCopied() || this.question.title.length ===0 || (this.questionServices.copyQuestion?.length && !this.copyChecker)){
      this.titleExist = true;
      document.getElementById('title')?.focus();
      return;
    }else{
      this.titleExist = false;
    }
    if(this.question.description.length < 12){
      this.descriptionValid = true;
      document.getElementById('description')?.focus();
      alert("Enter your description...");
      return;
    }else{
      this.descriptionValid = false
    }
    if(this.question.code.length < 12){
      this.codeValid = true;
      document.getElementById('code')?.focus();
      return;
    }else{
      this.codeValid = false
    }
    if(!this.question.tags.length){
      this.tagsValid = true;
      document.getElementById('tag')?.focus();
    }else{
      this.tagsValid = false;
    }
    let resd ;
    this.questionServices.postQuestion(this.question).subscribe((data) => resd = data);
    console.log(resd,"jdf");
    this.router.navigate(['/questions']);
  }
  toggler(){
    this.toggle = !this.toggle;
  }
}

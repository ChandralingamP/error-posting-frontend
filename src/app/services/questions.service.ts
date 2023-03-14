import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { Answer, Questions } from '../interface/interface.model';
import { Question } from '../interface/interface.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  public questions: Array<Question> | undefined
  public dummy: Array<Question> | undefined
  public copyQuestion: Array<Question> | undefined

  constructor(private webService : WebService) {}
  getExistQuestions(title : string){
    this.webService.get(`error/title/${title}`).subscribe((data : any)=> this.copyQuestion = data);
  }
  getSearchQuestions(query: string){
    this.webService.get(`error/searchQuestion/${query}`).subscribe((data:any)=> this.questions = data);
  }
  postQuestion(question : Questions){
    return this.webService.post('error/add',question);
  }
  getTaggedQuestion(tag : string){
    this.questions = undefined
    return this.webService.get('error/tags/'+tag).subscribe((data: any) => this.questions = data);
  }
  getUserData(id : string){
    return this.webService.get(`error/${id}`);
  }
  getAllQuestion(){
    this.questions = undefined
    return this.webService.get('error/all').subscribe((data: any) => this.questions = data);
  }
  getHighVotesQuestion(){
    this.questions = undefined
    return this.webService.get('error/votes').subscribe((data: any) => this.questions = data);
  }
  getNewQuestion(){
    this.questions = undefined
    return this.webService.get('error/newest').subscribe((data: any) => this.questions = data);
  }
  getHighViewsQuestion(){
    this.questions = undefined
    return this.webService.get('error/views').subscribe((data: any) => this.questions = data);
  }
  getUnAnsweredQuestion(){
    this.questions = undefined
    return this.webService.get('error/unanswered').subscribe((data: any) => this.questions = data);
  }
  getHighVotesQuestionTag(tag : any){
    this.questions = undefined
    return this.webService.get('error/votes').subscribe((data: any) => {
      this.dummy = data;
      const d = this.dummy?.filter((ob)=> ob.tags == tag);
      this.questions = d;
    });
  }
  getNewQuestionTag(tag : any){
    this.questions = undefined
    return this.webService.get('error/newest').subscribe((data: any) => {
      this.dummy = data;
      const d = this.dummy?.filter((ob)=> ob.tags == tag);
      this.questions = d;
    });
  }
  getHighViewsQuestionTag(tag : any){
    this.questions = undefined
    return this.webService.get('error/views').subscribe((data: any) => {
      this.dummy = data;
      const d = this.dummy?.filter((ob)=> ob.tags == tag);
      this.questions = d;
    });
  }
  getUnAnsweredQuestionTag(tag : any){
    this.questions = undefined
    return this.webService.get('error/unanswered').subscribe((data: any) => {
      this.dummy = data;
      const d = this.dummy?.filter((ob)=> ob.tags == tag);
      this.questions = d;
    });
  }
  getQuestionById(id : string){
    return this.webService.get('error/questions/'+id);
  }
  updateAnswer(id : any ,payload : Answer){
    this.questions = undefined
    return this.webService.post('error/answer/'+id,payload).subscribe(data => console.log(data));
  }
  IncVoteCount(id:any,uid : any){
    console.log("user",uid);
    return this.webService.patch(`error/incvote/${id}`,{uid: uid});
  }
  decVoteCount(id:any,uid : any){
    console.log("user",uid);
    return this.webService.patch(`error/deccvote/${id}`,{uid: uid});
  }
}

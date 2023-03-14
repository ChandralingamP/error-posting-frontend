import { Injectable } from '@angular/core';
import { Answer, Question, Questions } from '../interface/interface.model';
import { Member, newQuestion } from '../interface/team.model';
import { WebService } from '../web.service'
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  toggleMenu : boolean = false
  questions: Array<Question> | undefined
  copyQuestion: Array<Question> | undefined
  question: Question | undefined
  teamId: String | undefined
  members: Array<Member> | undefined
  addMemberToggle: boolean = false
  constructor(private service: WebService) { }
  createTeam(name: String, member: Member) {
    return this.service.post(`team/create`, { name: name, member: member });
  }
  addMember(teamId: String, member: Member) {
    this.service.post(`team/member/add/${teamId}`, member).subscribe((data: any) =>this.members = data);
  }
  removeMember(teamId: String, member: Member) {
    this.service.patch(`team/member/remove/${teamId}`, member);
  }
  getTeam(teamId: String) {
    this.members = undefined
    return this.service.get(`team/${teamId}`).subscribe((data: any) => {
      this.teamId = data._id; this.members = data.member; this.questions = data.question
    });
  }
  getMembers(teamId: String) {
    this.service.get(`team/members/${teamId}`).subscribe((data: any) => { this.members = data; });
  }
  getAllQuestions(teamId: String) {
    this.questions = undefined
    this.service.get(`team/questions/${teamId}`).subscribe((data: any) => this.questions = data);
  }
  getMembersQuestions(teamId: String, memberId: String) {
    this.questions = undefined
    this.service.get(`team/question/${teamId}/${memberId}`).subscribe((data: any) => this.questions = data);
  }
  addQuestion(teamId: String, question: newQuestion) {
    this.service.patch(`team/question/${teamId}`, question).subscribe((data)=>console.log(data)
    )
  }
  addAnswer(teamId: String, qid: String, answer: Answer) {
    this.service.patch(`team/answer/${teamId}/${qid}`, answer).subscribe((data) => {
      console.log(data); this.getAnswer(teamId, qid)
    })
  }
  getAnswer(id: String, qid: String) {
    return this.service.get(`team/answer/${id}/${qid}`);
  }
  getNewQuestion(id: String) {
    this.questions = undefined
    return this.service.get(`team/newest/${id}`).subscribe((data: any) => this.questions = data);
  }
  getMembersNewQuestion(id: String, mid: String) {
    this.questions = undefined
    return this.service.get(`team/newest/${id}/${mid}`).subscribe((data: any) => this.questions = data);
  }
  getHighViewsQuestion(id: String) {
    this.questions = undefined
    return this.service.get(`team/views/${id}`).subscribe((data: any) => this.questions = data);
  }
  getMemberHighViewsQuestion(id: String, mid: String) {
    this.questions = undefined
    console.log(id,mid,"get");

    return this.service.get(`team/views/members/${id}/${mid}`).subscribe((data: any) => this.questions = data);
  }
  getUnAnsweredQuestion(id: String) {
    this.questions = undefined
    return this.service.get(`team/unanswered/${id}`).subscribe((data: any) => this.questions = data);
  }
  getMembersUnAnsweredQuestion(id: String, mid: String) {
    this.questions = undefined
    return this.service.get(`team/unanswered/${id}/${mid}`).subscribe((data: any) => this.questions = data);
  }
  IncVoteCount(teamId: String, qid: any, uid: any) {
    return this.service.patch(`team/incvote/${teamId}/${qid}`, { uid: uid });
  }
  decVoteCount(teamId: String, qid: any, uid: any) {
    this.questions = undefined
    return this.service.patch(`team/decvote/${teamId}/${qid}`, { uid: uid });
  }
  getExistQuestions(id: String, title: String) {
    this.questions = undefined
    console.log('team/title/'+id+'/'+title);
    this.service.get(`team/title/${id}/${title}`).subscribe((data: any) =>{ this.copyQuestion = data; console.log(data);
    });
  }
  getSearchQuestions(id: String, query: String) {
    this.questions = undefined
    this.service.get(`team/searchQuestion/${id}/${query}`).subscribe((data: any) => this.questions = data);
  }
  getSearchMembersQuestions(id: String, mid: String, query: String) {
    this.questions = undefined
    this.service.get(`team/searchQuestion/${id}/${mid}/${query}`).subscribe((data: any) => this.questions = data);
  }
  getTaggedQuestion(id: String, tag: String) {
    this.questions = undefined
    return this.service.get(`team/tags/${id}/${tag}`).subscribe((data: any) => this.questions = data);
  }
}

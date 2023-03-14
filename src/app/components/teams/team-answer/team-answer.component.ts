
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer, Question } from 'src/app/interface/interface.model';
import { TeamService } from 'src/app/services/team.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-team-answer',
  templateUrl: './team-answer.component.html'
})
export class TeamAnswerComponent implements OnInit {
  descriptionValid: boolean = false
  teamId: String | undefined
  question: Question | undefined
  questionId: String | undefined
  answer: Answer = {
    userId: '',
    description: '',
    code: '',
    userName: ''
  }
  emailFormat = {
    to_name: '',
    link_to: '',
    email_to: '',
  }
  constructor(public service: TeamService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id')!;
    this.questionId = this.route.snapshot.paramMap.get('qid')!
    this.emailFormat.link_to = "http://localhost:4200/team/answer/" + this.teamId + "/" + this.questionId;
    this.getAnswer()
  }
  getAnswer() {
    if (this.teamId && this.questionId)
      this.service.getAnswer(this.teamId, this.questionId).subscribe((data: any) => { this.question = data; console.log(data); });
  }
  getUserId() {
    const id = JSON.parse(localStorage.getItem('user')!);
    const name = localStorage.getItem('userName')!;
    if (id) {
      this.answer.userId = id;
      this.emailFormat.to_name = name;
      this.answer.userName = name;
      return true
    } else {
      alert('Login To post your answer');
      return false;
    }
  }
  postAnswer() {
    // if (this.getUserId()) {
    //   if (this.answer.description.length < 10) {
    //     this.descriptionValid = true
    //     document.getElementById('description')?.focus();
    //     return;
    //   } else {
    //     if(this.teamId && this.questionId){
    //       console.log(this.answer);
    //       this.descriptionValid = false
    //       this.service.addAnswer(this.teamId,this.questionId, this.answer)
    //     }
    //   }
    // }
    const uname = this.service.members?.filter((obj: any) => {
      if (obj._id == this.question?.userId) {
        if (obj.userName) {
          return obj;
        }
      }
    });
    if (uname) {
      this.emailFormat.email_to = uname[0].email.toString();
      this.emailFormat.to_name = uname[0].userName.toString();
    }
    this.answer = {
      userId: '',
      description: '',
      code: '',
      userName: ''
    }
    // this.sendEmail();
  }
  sendEmail() {
    emailjs.send("service_dzy9v2y", "template_7l0tvm4", this.emailFormat,"9VjQjoYJkLSaJ3vvW").then((result: EmailJSResponseStatus) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  }
  incVote() {
    const id = JSON.parse(localStorage.getItem('user')!);
    console.log(id, "inc");
    if (id) {
      if (this.question?.votes.includes(id)) {
        console.log("exitst");
        return;
      } else {
        this.question?.votes.push(id)
        console.log(this.question?.votes);

        this.service.IncVoteCount(this.teamId!, this.questionId, id).subscribe((Data) => console.log(Data));
      }
    } else {
      alert('Login to Vote')
    }
  }
  decVote() {
    const id = JSON.parse(localStorage.getItem('user')!);
    console.log(id);
    if (id) {
      if (this.question?.votes) {
        console.log(this.question.votes);
        this.service.decVoteCount(this.teamId!, this.questionId, id).subscribe((data)=>console.log(data));
        this.question.votes = this.question.votes.filter((data) => data != id);
      }
    } else {
      alert('Login to Vote')
    }
  }
  navTo(uri: string) {
    this.router.navigate([uri])
  }

}

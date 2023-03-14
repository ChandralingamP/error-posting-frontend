import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer, EmailFormat, Question } from 'src/app/interface/interface.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { TeamService } from 'src/app/services/team.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html'
})


export class AnswerComponent implements OnInit {
  descriptionValid: boolean = false
  question: Question | undefined
  answer: Answer = {
    userId: '',
    description: '',
    code: '',
    userName: ''
  }
  emailFormat = {
    to_name: '' ,
    link_to:'',
    email_to: '',
  }
  constructor(private service: QuestionsService,private userService : UsersService, private route: ActivatedRoute, private router: Router, private teamService: TeamService) { }
  ngOnInit() {
    if(this.userService.userData){
      this.emailFormat.to_name = this.userService.userData.userName;
    }else{
      this.userService.getUser(localStorage.getItem('user')!);
    }
    this.getAnswer()
  }
  getEmail(id : string){
    this.userService.getEmail(id).subscribe((Data : any)=> {this.emailFormat.email_to = Data.email;});
  }
  getAnswer() {
    const userName = localStorage.getItem('userName')!;
    const id = this.route.snapshot.paramMap.get('id');
    this.emailFormat.to_name = userName;
    this.emailFormat.link_to = "http://localhost:4200/answers/" + id;
    if (id)
      this.service.getQuestionById(id).subscribe((data: any) => {
        this.question = data[0];
        this.emailFormat.to_name = data[0].userName;
        this.getEmail(data[0].userId);
      });
  }
  getUserId() {
    const id = JSON.parse(localStorage.getItem('user')!);
    const name = localStorage.getItem('userName')!;
    if (id) {
      this.answer.userId = id;
      this.answer.userName = name;
      return true
    } else {
      alert('Login To post your answer');
      return false;
    }
  }

  public sendEmail() {
    emailjs.send("service_dzy9v2y", "template_7l0tvm4", this.emailFormat,"9VjQjoYJkLSaJ3vvW").then((result: EmailJSResponseStatus) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  }

  postAnswer() {
    if (this.getUserId()) {
      if (this.answer.description.length < 10) {
        this.descriptionValid = true
        document.getElementById('description')?.focus();
        return;
      } else {
        this.service.updateAnswer(this.question?._id, this.answer)
      }
    }
    this.answer = {
      userId: '',
      description: '',
      code: '',
      userName: ''
    }
    this.getAnswer()
    // this.sendEmail();
  }


  incVote() {
    const id = JSON.parse(localStorage.getItem('user')!);
    console.log(id, "inc");
    if (id) {
      if (this.question?.votes.includes(id)) {
        console.log("exitst");
        return;
      } else {
        this.service.IncVoteCount(this.question?._id, id).subscribe((Data) => this.question?.votes.push(id));
      }
    } else {
      alert('Login to Vote')
    }
  }


  decVote() {
    const id = JSON.parse(localStorage.getItem('user')!);
    if (id) {
      if (this.question?.votes.includes(id)) {
        this.service.decVoteCount(this.question._id, id);
        this.question.votes = this.question.votes.filter((data) => data != id);
      }
    } else {
      alert('Login to Vote')
    }
  }


  navTo(uri: string) {
    this.teamService.toggleMenu = false;
    this.router.navigate([uri])
  }
}

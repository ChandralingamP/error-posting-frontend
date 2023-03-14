import { Component, OnInit } from '@angular/core';
import { Question, User } from 'src/app/interface/interface.model';
import { WebService } from 'src/app/web.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  userId: string | undefined
  userData: User | undefined
  questions: Array<Question> | undefined
  createdDate: string | undefined
  date: string = ''
  diffDays = 0
  constructor(public authService: AuthService, private userService: UsersService, private route: ActivatedRoute, private router: Router, private webService: WebService) { }
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.webService.get(`users/${this.userId}`).subscribe((data: any) => {
        this.userData = data; console.log(data);
        this.createdDate = data.createdAt?.slice(0, 9)
        if (this.createdDate)
          this.date = this.createdDate
        const date1 = new Date(this.date);
        const date2 = new Date();
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      });
      this.userService.getUserQuestions(this.userId).subscribe((data: any) => {
        this.questions = data; console.log(data);
      });
    }
  }

  navTo(id: any) {
    let uri = 'answers/' + id;
    console.log(uri);
    this.router.navigate([uri])
  }
}

  // constructor(private service : QuestionsService,private route : ActivatedRoute,private router: Router){}
  // ngOnInit(){
  //     const id = this.route.snapshot.paramMap.get('id');
  //     if(id)
  //       this.service.getQuestionById(id).subscribe((data : any)=> {this.question = data[0]; console.log(this.question);
  //     });
  // }
// }

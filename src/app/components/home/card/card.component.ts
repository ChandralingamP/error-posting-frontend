import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/interface/interface.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() question: Question | undefined
  date: string = ''
  constructor(private router: Router) { }
  navTo(uri: string) {
    if (this.question) {
      console.log(uri);
      this.router.navigate([uri])
    }
  }
  createdTime() {
    if (this.question?.createdAt)
      this.date = this.question?.createdAt.toString()
    const date1 = new Date(this.date);
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}

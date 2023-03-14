import { Component ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html'
})

export class TagComponent {
  @Input() tag = '';
  constructor(
    private router: Router
  ) { }
  navTo(uri: string) {
    this.router.navigate(['/' + uri])
  }
}

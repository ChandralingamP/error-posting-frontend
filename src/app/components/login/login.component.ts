import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit  {
  constructor(
    public authService: AuthService,
    private router : Router
  ) {}
  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.router.navigate(['/']);
    }
  }

}

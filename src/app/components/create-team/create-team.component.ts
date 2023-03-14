import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/interface/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html'
})
export class CreateTeamComponent implements OnInit{
  teamName : String = ''
  member : Member ={
    _id :  '',
    userName:  '',
    email: '',
    photoURL: ''
  }
  constructor(private userService : UsersService,private teamService : TeamService,private router : Router){}
  ngOnInit(){
    if(!this.userService.userData){
      const id = JSON.parse( localStorage.getItem('user')!);
      console.log(id);
      this.userService.getUser(id);
    }
  }
  creatTeam(){
    console.log(this.teamName);
    if(this.userService.userData){
      this.member._id = this.userService.userData._id
      this.member.email = this.userService.userData.email
      this.member.photoURL = this.userService.userData.photoURL
      this.member.userName = this.userService.userData.userName
    }
    this.teamService.createTeam(this.teamName,this.member).subscribe((data : any)=>this.router.navigate(['team/'+data?._id]));

  }
}

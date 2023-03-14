import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/interface.model';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit  {
  users : Array<User> | undefined
  nameQuery : String = '';
  constructor(private service : UsersService,private router : Router){}
  async ngOnInit(){
    this.getUserData();
  }
  async getUserData(){
    this.service.getUsers().subscribe((data : any)=> {this.users =  data;});
  }
  navTo(id : string){
    let path = '/dashboard/'+id;
    console.log(path);
    this.router.navigate([path])
  }
  searchUser(){
    if(this.nameQuery == ''){
      this.service.getUsers().subscribe((data : any)=> {this.users =  data;});
    }else{
      this.service.searchUsers(this.nameQuery).subscribe((data : any )=> this.users = data);
    }
  }
}

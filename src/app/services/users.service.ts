import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { User } from '../interface/interface.model';
import { Teams } from '../interface/team.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  userData : User | undefined
  teams : Array<Teams> | undefined
  constructor(private webService : WebService) {}
  getUserTeams(){
    const id = JSON.parse(localStorage.getItem('user')!)
    return this.webService.get('users/team/'+id).subscribe((data:any)=>{this.teams = data;});
  }
  createUser(user : User){
    return this.webService.post('users',user);
  }
  getUser(id:string){
    this.webService.get('users/'+id).subscribe((data: any )=> {this.userData = data;});
  }
  getEmail(id:string){
    return this.webService.get('users/'+id);
  }
  getUsers(){
    return this.webService.get('users/');
  }
  searchUsers(name : String ){
    return this.webService.get('users/search/'+name);
  }
  getUserQuestions(id:String){
    return this.webService.get(`users/question/${id}`);
  }
}

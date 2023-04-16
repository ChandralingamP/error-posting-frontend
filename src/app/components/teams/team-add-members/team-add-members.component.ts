import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface/interface.model';
import { Member } from 'src/app/interface/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-team-add-members',
  templateUrl: './team-add-members.component.html'
})
export class TeamAddMembersComponent {
  users: Array<User> | undefined
  teamId : String | undefined
  nameQuery: String = '';
  member: Member = {
    _id: '',
    userName: '',
    email: '',
    photoURL: ''
  }
  constructor(private service: UsersService, private teamService: TeamService,private route : ActivatedRoute) { }
  async ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get("id")!;
    this.getUserData();

  }
  async getUserData() {
    this.service.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }
  addMember(newUser: Member){
    if (this.teamService.members) {
      if (!this.teamService.members.find(user => user._id === newUser._id)) {
        if (newUser) {
          this.member._id = newUser._id
          this.member.email = newUser.email
          this.member.photoURL = newUser.photoURL
          this.member.userName = newUser.userName
        }
        if(this.teamId){
          // console.log(this.teamId,this.member);
          this.teamService.members.push(this.member);
          this.teamService.addMember(this.teamId,this.member);
        }
      }
    }
  }
  closeAddMember(){
    this.teamService.addMemberToggle = false;
  }
  searchUser() {
    if (this.nameQuery == '') {
      this.service.getUsers().subscribe((data: any) => { this.users = data; });
    } else {
      this.service.searchUsers(this.nameQuery).subscribe((data: any) => this.users = data);
    }
  }
}

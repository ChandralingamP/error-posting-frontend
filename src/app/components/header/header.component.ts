import { Component, EventEmitter, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interface/interface.model';
import { WebService } from 'src/app/web.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { TeamService } from 'src/app/services/team.service';
import { StorageService } from 'src/app/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  query: string = ''
  title = 'error-posting-application';
  userId: string = ''
  userData: User = {
    userName: '',
    _id: '',
    email: '',
    photoURL: '',
    reputation: 0,
    teams: []
  }
  menuToggle = false
  teamId: String | undefined
  memberId: String | undefined
  toggleMenu: boolean = false
  currentPath: String | undefined;
  hide: string = 'hidden'
  toggle: boolean = false
  constructor(private webService: WebService, public storageService: StorageService, private teamService: TeamService, private questionService: QuestionsService, library: FaIconLibrary, private authService: AuthService, private router: Router, private route: ActivatedRoute) { library.addIcons(faMagnifyingGlass); }
  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.currentPath = event.url;
      this.teamId = this.route.snapshot.paramMap.get('id')!;
      this.memberId = this.route.snapshot.paramMap.get('uid')!
      const path = this.currentPath?.split('/')[1];
      const team = this.currentPath?.split('/')[2];
      if(team == 'create' && path == 'team'){
        this.toggleMenu = false;
      }
      else if (path == 'team') {
        this.toggleMenu = true;
      } else {
        this.toggleMenu = false;
      }
    });
    this.userId = JSON.parse(localStorage.getItem('user')!);
    if (this.userId) {
      console.log(this.userId);
      this.webService.get(`users/${this.userId}`).subscribe((data: any) => {
        if (data) {
          this.userData._id = data?._id;
          this.userData.email = data.email;
          this.userData.photoURL = data.photoURL;
          this.userData.userName = data.userName;
          localStorage.setItem('userName', data.userName);
          this.userData.reputation = data.reputation;
          if (this.userData.userName.length > 20) {
            this.userData.userName = this.userData.userName.split(" ")[0];
          }
        }
      });
    }
  }
  navTo(uri: string) {
    if (uri == 'logout') {
      this.authService.SignOut()
      this.userId = '';
    } else {
      this.router.navigate(['/' + uri + '/' + this.userId])
    }

    this.storageService.hideBoth();
    this.toggler();
  }
  toggler() {
    this.toggle = !this.toggle;
    console.log(this.toggle);
  }

  menuToggler() {
    this.storageService.closeMenu = !this.storageService.closeMenu;
    if (this.toggleMenu) {
      this.storageService.teamToggler();
    } else {
      this.storageService.toggler()
    }
  }

  NavToggler() {
    this.teamService.toggleMenu = !this.teamService.toggleMenu;
  }

  searchQuery() {
    this.memberId = this.route.snapshot.paramMap.get('uid')!
    if (this.toggleMenu) {
      if (this.query == '') {
        if (this.teamService.teamId) {
          console.log(this.memberId);
          if (this.memberId) {
            this.teamService.getMembersQuestions(this.teamService.teamId, this.memberId);
          } else {
            this.teamService.getAllQuestions(this.teamService.teamId);
          }
        }
      } else {
        if (this.teamService.teamId) {
          if (this.memberId) {
            console.log("hee");

            this.teamService.getSearchMembersQuestions(this.teamService.teamId, this.memberId, this.query);
          } else {
            this.teamService.getSearchQuestions(this.teamService.teamId, this.query);
          }
        }
      }
    } else {
      if (this.query == '') {
        this.questionService.getAllQuestion();
      } else {
        this.questionService.getSearchQuestions(this.query);
      }
    }
  }
  getName(name: any) {
    if (name.length > 14) {
      return name.slice(0, 15);
    } else {
      return name;
    }
  }

}

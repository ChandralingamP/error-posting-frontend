import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEarthAmericas, faUsers, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { TeamService } from 'src/app/services/team.service';
import { UsersService } from 'src/app/services/users.service';
import { StorageService } from 'src/app/storage.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  constructor(library: FaIconLibrary, public storageService: StorageService, private teamService: TeamService, public userService: UsersService, private router: Router) {
    library.addIcons(faEarthAmericas);
    library.addIcons(faUsers);
    library.addIcons(faHashtag);
  }
  ngOnInit() {
    this.userService.getUserTeams();
  }
  navTo(uri: String) {
    if (this.teamService.toggleMenu) {
      this.teamService.toggleMenu = false;
    }
    this.storageService.closeMenu = false;
    this.storageService.toggleMenu = 'hidden'
    this.storageService.toggleTeamMenu = 'hidden'
    this.router.navigate([uri])
  }
}

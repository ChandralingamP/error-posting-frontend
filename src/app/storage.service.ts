import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public toggleMenu = 'hidden';
  public closeMenu = false;
  public toggleTeamMenu = 'hidden';
  constructor() { }
  toggler(){
    console.log("tema");
    if(this.toggleMenu == 'hidden'){
      this.toggleMenu = 'block'
    }else{
      this.toggleMenu = 'hidden'
    }
  }
  teamToggler(){
    console.log("tema");
    if(this.toggleTeamMenu == 'hidden'){
      this.toggleTeamMenu = 'block'
    }else{
      this.toggleTeamMenu = 'hidden'
    }
  }
  hideBoth(){

    this.toggleMenu = 'hidden'
    this.toggleTeamMenu = 'hidden'
  }
}

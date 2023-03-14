import { Injectable, NgZone } from '@angular/core';
import { User } from '../interface/interface.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public userService : UsersService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData.uid));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }
  async SignIn(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/  ']);
          }
        });
        window.location.reload()
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  async SignUp(email: string, password: string) {
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.createUser(result.user);
        this.SetUserData(result.user);
        window.location.reload()
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  async SendVerificationMail() {
    return await this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  async ForgotPassword(passwordResetEmail: string) {
    return await this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then((data) => {
        console.log(data);
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  async GoogleAuth() {
    return await this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/']);
    });
  }
  async AuthLogin(provider: any) {
    return await this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/home']);
        this.createUser(result.user);
        this.SetUserData(result.user);
        window.location.reload()
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      _id: user.uid,
      email: user.email,
      userName: user.displayName,
      photoURL: user.photoURL,
      reputation : 0,
      teams : []
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  async SignOut() {
    return await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      this.router.navigate(['sign-in']);
    });
  }
  async createUser(user: any){
    const userData: User = {
      _id: user.uid,
      email: user.email,
      userName: user.displayName,
      photoURL: user.photoURL,
      reputation : 0,
      teams : []
    };
    console.log(userData);
    this.userService.createUser(userData);
    window.location.reload();
  }
}

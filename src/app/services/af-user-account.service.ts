import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {BehaviorSubject} from 'rxjs';

import {User} from '../model/user';

import {UserAccountService} from './user-account.service';

@Injectable()
export class AngularFireUserAccountService extends UserAccountService {
  activeUser = new BehaviorSubject<User|null>(null);
  private user: User|null;
  get loggedinUser(): User|null {
    return this.user;
  }
  set loggedinUser(value: User|null) {
    this.user = value;
    this.activeUser.next(value);
  }

  constructor(public afAuth: AngularFireAuth) {
    super();
  }


  loginWithEmail(email: string, pwd: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pwd)
        .then((credential: auth.UserCredential) => {
          this.loggedinUser = {
            email: credential.user.email,
            userName: 'DEFAULT NAME',
          };
        })
        .catch((e) => {
          console.log(e.message);
        });
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((credential: auth.UserCredential) => {
          this.loggedinUser = {
            email: credential.user.email,
            userName: 'DEFAULT NAME',
          };
        })
        .catch((e) => {
          console.log(e.message);
        });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // TODO: store username.
  signUp(email: string, uName: string, pwd: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, pwd)
        .then((credential: auth.UserCredential) => {
          this.loggedinUser = {
            email: credential.user.email,
            userName: uName,
          };
        })
        .catch((e) => {
          console.log(e.message);
        });
  }
}

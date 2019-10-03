import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
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

  constructor(public afAuth: AngularFireAuth, private afDb: AngularFirestore) {
    super();
  }

  loginWithEmail(email: string, pwd: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pwd)
        .then((credential: auth.UserCredential) => {
          this.afDb.collection('users').doc(email).get().subscribe((usr) => {
            this.loggedinUser = {
              email: credential.user.email,
              userName: usr.get('username')
            };
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
  }

  async loginWithGoogle() {
    const credential: auth.UserCredential =
        await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    const email = credential.user.email;
    const userName = credential.user.displayName;
    this.afDb.collection('users').doc(email).get().subscribe((user) => {
      this.loggedinUser = {email, userName: user.get('username')};
    });
    this.afDb.collection('users').doc(email).set({email, userName});
    this.loggedinUser = {email, userName};
  }


  logout() {
    this.afAuth.auth.signOut();
  }

  signUp(email: string, uName: string, pwd: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, pwd)
        .then((_) => {
          return this.afDb.collection('users').doc(email).set({
            email,
            username: uName,
          });
        })
        .then((_) => {
          this.loggedinUser = {
            email,
            userName: uName,
          };
        })
        .catch((e) => {
          console.log(e.message);
        });
  }
}

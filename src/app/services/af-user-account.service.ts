import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {auth} from 'firebase/app';
import {BehaviorSubject} from 'rxjs';

import {User} from '../model/user';

import {UserAccountService} from './user-account.service';

@Injectable()
export class AngularFireUserAccountService extends UserAccountService {
  activeUser = new BehaviorSubject<User|null>(null);
  isLoggedin: boolean = false;

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
    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    })
  }

  loginWithEmail(email: string, pwd: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pwd)
        .then(
            (credential: auth.UserCredential) => {
              this.afDb.collection('users').doc(email).get().subscribe(
                  (usr) => {
                    this.loggedinUser = {
                      email: credential.user.email,
                      userName: usr.get('userName'),
                      photoUrl: usr.get('photoUrl')
                    };
                  });
              this.isLoggedin = true;
            }

            )
        .catch((e) => {
          console.log(e.message);
        });
  }

  async loginWithGoogle() {
    const credential: auth.UserCredential =
        await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    const email = credential.user.email;
    const userName = credential.user.displayName;
    const userPhoto = credential.user.photoURL ?
        credential.user.photoURL :
        'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef';
    const userRef = this.afDb.collection('users').doc(email);

    userRef.get().subscribe((user) => {
      if (user.exists) {
        this.loggedinUser = {
          email,
          userName: user.get('userName'),
          photoUrl: user.get('photoUrl')
        };
      } else {
        this.afDb.collection('users')
            .doc(email)
            .set({email, userName, photoUrl: userPhoto})
            .then((_) => {
              this.loggedinUser = {email, userName, photoUrl: userPhoto};
            })
            .catch((e) => {
              console.log(e.message);
            });
        ;
      }
    })
  }


  logout() {
    this.afAuth.auth.signOut();
    this.isLoggedin = false;
  }

  signUp(email: string, uName: string, pwd: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, pwd)
        .then((_) => {
          return this.afDb.collection('users').doc(email).set({
            email,
            userName: uName,
            photoUrl:
                'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef'
          });
        })
        .then((_) => {
          this.loggedinUser = {
            email,
            userName: uName,
            photoUrl:
                'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef'
          };
        })
        .catch((e) => {
          console.log(e.message);
        });
  }

  updatePwd(email: string, pwd: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, pwd);
  }

  updateName(email: string, userName: string) {
    this.afDb.collection('users')
        .doc(email)
        .update({email, userName})
        .then((_) => {
          this.loggedinUser.userName = userName;
        })
        .catch((e) => {
          console.log(e.message);
        });
  }

  updatePhoto(email: string, photoUrl: string) {
    this.afDb.collection('users')
        .doc(email)
        .update({photoUrl})
        .then((_) => {
          this.loggedinUser.photoUrl = photoUrl;
        })
        .catch((e) => {
          console.log(e.message);
        });
  }
}

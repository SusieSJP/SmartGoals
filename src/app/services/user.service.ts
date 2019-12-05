import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs';

import {User} from '../model/user';

@Injectable()
export class UserService {
  database = firebase.firestore();
  auth = firebase.auth();
  provider = new firebase.auth.GoogleAuthProvider();
  // we use the BehaviorSubject because we need to 1) actively emit new user and
  // 2) immediately get the current value when subscribe to the activeUser
  activeUser = new BehaviorSubject<User>(null);
  isLoggedin: boolean = false;
  refreshPending: Promise<void>;
  // default value of expiration duration is 1 hour, transform into ms.
  defaultExpirationDuration = 3600 * 1000;

  errorMessage = '';
  // expirationTime is a timeout ID, the return value of setTimeout inside auto
  // logout function
  private expirationTimer: any = null;

  constructor(private router: Router) {}

  signUp(email: string, userName: string, pwd: string) {
    // createUserWithEmailAndPassword returns a Promise
    this.auth.createUserWithEmailAndPassword(email, pwd)
        .then((_) => {
          const newUser = new User(email, userName);
          return this.database.collection('users').doc(email).set({...newUser});
        })
        .then((_) => {
          const newUser = new User(email, userName);
          this.isLoggedin = true;
          this.activeUser.next(newUser);
          // use local storage to manage status expiration and call auto logout.
          this.handleStatusExpiration(email);
          // after signup, redirect to the mainpage, no need to login again.
          this.router.navigate(['/mainpage', userName])
        })
        .catch((e) => {
          this.errorMessage = e.message;
        });
  }

  loginWithEmail(email: string, pwd: string) {
    this.auth.signInWithEmailAndPassword(email, pwd)
        .then((authRes) => {
          this.isLoggedin = true;
          this.database.collection('users')
              .doc(authRes.user.email)
              .get()
              .then(doc => {
                const fetchedData = doc.data();
                const newUser = new User(
                    fetchedData.email, fetchedData.userName,
                    fetchedData.defaultPhoto, fetchedData.photoUrl);
                this.activeUser.next(newUser);
                // use local storage to manage status expiration and call auto
                // logout.
                this.handleStatusExpiration(fetchedData.email);
                // after login, redirect to the mainpage.
                this.router.navigate(['/mainpage', fetchedData.userName])
              })
        })
        .catch((e) => {
          this.errorMessage = e.message;
        });
  }

  autoLogin() {
    this.refreshPending = new Promise((resolve, reject) => {
      const prevUser: {email: string, expirationDate: string} =
          JSON.parse(localStorage.getItem('userData'));
      if (!prevUser) {
        resolve();
      };

      if (new Date() < new Date(prevUser.expirationDate)) {
        this.database.collection('users')
            .doc(prevUser.email)
            .get()
            .then(doc => {
              const fetchedData = doc.data();
              const newUser = new User(
                  fetchedData.email, fetchedData.userName,
                  fetchedData.defaultPhoto, fetchedData.photoUrl);
              this.activeUser.next(newUser);
              // similar to mamually logout, we need to clear previous data in
              // the localStorage and expiration timer
              localStorage.removeItem('userData');
              clearTimeout(this.expirationTimer);
              this.expirationTimer = null;
              // new sign in, the expiration time start over for 1 hour
              this.handleStatusExpiration(prevUser.email);

              this.isLoggedin = true;
              resolve();
            })
      }
    })
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer =
        setTimeout(() => {this.logout()}, expirationDuration);
  }

  logout() {
    this.auth.signOut();
    this.isLoggedin = false;
    this.activeUser.next(null);
    this.router.navigate(['/']);

    // remove the userData in local storage
    localStorage.removeItem('userData');

    if (this.expirationTimer) {
      // user signout before expiration
      clearTimeout(this.expirationTimer);
    }
    // reset the value to null
    this.expirationTimer = null;
  }

  private handleStatusExpiration(email: string) {
    const expirationDate =
        new Date(new Date().getTime() + this.defaultExpirationDuration);
    const userData = {email, expirationDate};
    this.autoLogout(this.defaultExpirationDuration);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  async loginWithGoogle() {
    const credential = await this.auth.signInWithPopup(this.provider);
    const email = credential.user.email;
    const userName = credential.user.displayName;
    const defaultPhoto = credential.user.photoURL ? false : true;
    const userPhoto = credential.user.photoURL ?
        credential.user.photoURL :
        'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef';
    const userRef = this.database.collection('users').doc(email);

    userRef.get().then((doc) => {
      if (doc.exists) {
        // user exists, use the info from database
        const newUser = new User(
            email, doc.data().userName, doc.data().defaultPhoto,
            doc.data().photoUrl);
        this.activeUser.next(newUser);
        // use local storage to manage status expiration and call auto
        // logout.
        this.handleStatusExpiration(email);
        // after login, redirect to the mainpage.
        this.router.navigate(['/mainpage', doc.data().userName]);
        this.isLoggedin = true;
      } else {
        // user doesn't exist
        // set the new data in the firestore first
        const newUser = new User(email, userName, defaultPhoto, userPhoto);
        this.database.collection('users')
            .doc(email)
            .set({...newUser})
            .then((_) => {
              this.activeUser.next(newUser);
              this.handleStatusExpiration(email);
              // after login, redirect to the mainpage.
              this.router.navigate(['/mainpage', doc.data().userName]);
              this.isLoggedin = true;
            })
            .catch((e) => {
              console.log(e.message);
            });
      }
    })
  }

  updatePwd(pwd: string) {
    const user = this.auth.currentUser;
    return user.updatePassword(pwd);
  }

  updateName(email: string, userName: string) {
    return this.database.collection('users').doc(email).update({userName});
  }

  updatePhoto(email: string, photoUrl: string) {
    return this.database.collection('users').doc(email).update(
        {defaultPhoto: false, photoUrl});
  }
}

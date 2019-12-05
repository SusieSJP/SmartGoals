// import {Injectable} from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/auth';
// import {AngularFirestore} from '@angular/fire/firestore';
// import {auth} from 'firebase/app';
// import {BehaviorSubject, Subject} from 'rxjs';

// import {User} from '../model/user';

// import {UserAccountService} from './user-account.service';
// import {Router} from '@angular/router';

// @Injectable()
// export class AngularFireUserAccountService extends UserAccountService {
//   // we use the Subject not observable because we need to actively emit new
//   user with login / clear the user with logout. activeUser = new
//   Subject<User|null>(); isLoggedin: boolean = false;

//   // activeUser = new BehaviorSubject<User|null>(null);
//   // isLoggedin: boolean = false;

//   // private user: User|null;
//   // get loggedinUser(): User|null {
//   //   return this.user;
//   // }
//   // set loggedinUser(value: User|null) {
//   //   this.user = value;
//   //   this.activeUser.next(value);
//   // }

//   constructor(public afAuth: AngularFireAuth, private afDb: AngularFirestore,
//   private router: Router) {
//     // AngularFireAuth.user provides you an Observable<User|null> to monitor
//     // authentication State. AngularFireAuth.auth returns an initialized
//     // firebase.auth.Auth instance.
//     // https://firebase.google.com/docs/reference/js/firebase.auth.Auth

//     super();
//     this.afAuth.auth.onAuthStateChanged(user => {
//       if (user) {
//         this.isLoggedin = true;
//       } else {
//         this.isLoggedin = false;
//       }
//     })
//   }

//   signUp(email: string, userName: string, pwd: string) {
//     // createUserWithEmailAndPassword returns a Promise
//     this.afAuth.auth.createUserWithEmailAndPassword(email, pwd)
//         .then((_) => {
//           const loginAt = new Date();
//           const newUser = new User(email, userName, loginAt);
//           const userData = {
//             email: newUser.email,
//             userName: newUser.userName,
//             photoURL: newUser.photoUrl
//           }
//           return this.afDb.collection('users').doc(email).set({...userData});
//           // return value is also a Promise
//         })
//         .then((_) => {
//           const newUser = new User(email, userName, new Date());
//           this.isLoggedin = true;
//           this.activeUser.next(newUser);
//           // after signup, redirect to the mainpage, no need to login again.
//           this.router.navigate(['/mainpage', userName])
//           // this.loggedinUser = {
//           //   email,
//           //   userName,
//           //   photoUrl:
//           //
//           'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef'
//           // };
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//   }

//   loginWithEmail(email: string, pwd: string) {
//     this.afAuth.auth.signInWithEmailAndPassword(email, pwd)
//         .then(
//             (credential: auth.UserCredential) => {
//               this.afDb.collection('users').doc(email).get().subscribe(
//                   (usr) => {
//                     const newUser = new User(credential.user.email,
//                     usr.get('userName'), new Date());
//           this.activeUser.next(newUser);
//                     this.activeUser.next({

//                     })
//                       email: credential.user.email,
//                       userName: usr.get('userName'),
//                       photoUrl: usr.get('photoUrl')
//                     };
//                   });
//               this.isLoggedin = true;
//             }

//             )
//         .catch((e) => {
//           console.log(e.message);
//         });
//   }

//   async loginWithGoogle() {
//     const credential: auth.UserCredential =
//         await this.afAuth.auth.signInWithPopup(new
//         auth.GoogleAuthProvider());
//     const email = credential.user.email;
//     const userName = credential.user.displayName;
//     const userPhoto = credential.user.photoURL ?
//         credential.user.photoURL :
//         'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef';
//     const userRef = this.afDb.collection('users').doc(email);

//     userRef.get().subscribe((user) => {
//       if (user.exists) {
//         this.loggedinUser = {
//           email,
//           userName: user.get('userName'),
//           photoUrl: user.get('photoUrl')
//         };
//       } else {
//         this.afDb.collection('users')
//             .doc(email)
//             .set({email, userName, photoUrl: userPhoto})
//             .then((_) => {
//               this.loggedinUser = {email, userName, photoUrl: userPhoto};
//             })
//             .catch((e) => {
//               console.log(e.message);
//             });
//         ;
//       }
//     })
//   }


//   logout() {
//     this.afAuth.auth.signOut();
//     this.isLoggedin = false;
//   }



//   updatePwd(email: string, pwd: string) {
//     this.afAuth.auth.createUserWithEmailAndPassword(email, pwd);
//   }

//   updateName(email: string, userName: string) {
//     this.afDb.collection('users')
//         .doc(email)
//         .update({email, userName})
//         .then((_) => {
//           this.loggedinUser.userName = userName;
//         })
//         .catch((e) => {
//           console.log(e.message);
//         });
//   }

//   updatePhoto(email: string, photoUrl: string) {
//     this.afDb.collection('users')
//         .doc(email)
//         .update({photoUrl})
//         .then((_) => {
//           this.loggedinUser.photoUrl = photoUrl;
//         })
//         .catch((e) => {
//           console.log(e.message);
//         });
//   }
// }

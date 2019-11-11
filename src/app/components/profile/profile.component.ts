import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {BehaviorSubject, Observable} from 'rxjs';
import {concatMap, last} from 'rxjs/operators';
import {UserAccountService} from 'src/app/services/user-account.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fireImgUrl$ = new BehaviorSubject<string>(null);
  userEmail: string;
  userName: string;
  userPhotoUrl: string;

  editName: boolean = false;
  updatedName: string;
  editPwd: boolean = false;
  updatedPwd: string;
  editPhoto: boolean = false;

  downloadUrl$: Observable<string>;
  testUrl: string;
  file: any;
  filePath: string;
  testPath: string;

  constructor(
      private userAccountService: UserAccountService,
      private storage: AngularFireStorage) {}

  ngOnInit() {
    this.userEmail = this.userAccountService.loggedinUser.email;
    this.userName = this.userAccountService.loggedinUser.userName;
    this.userPhotoUrl = this.userAccountService.loggedinUser.photoUrl;
  }

  onUserName(event: Event) {
    this.updatedName = (<HTMLInputElement>event.target).value;
  }

  onPwd(event: Event) {
    this.updatedPwd = (<HTMLInputElement>event.target).value;
  }

  uploadFile(event) {
    this.editPhoto = true;
    this.file = event.target.files[0];
    this.testPath = `profilePhotos/${this.userEmail}/test/${this.file.name}`;
    const task = this.storage.upload(this.testPath, this.file);
    this.downloadUrl$ = task.snapshotChanges().pipe(
        last(),
        concatMap(() => this.storage.ref(this.testPath).getDownloadURL()));

    this.downloadUrl$.subscribe(url => {
      this.testUrl = url;
      console.log('testUrl is ' + url);
    });
  }

  updateInfo() {
    if (this.editPwd) {
      this.userAccountService.updatePwd(this.userEmail, this.updatedPwd);
    };

    if (this.editName) {
      this.userAccountService.updateName(this.userEmail, this.updatedName);
    };
  }

  uploadPhoto(finalUrl: string) {
    this.filePath = `profilePhotos/${this.userEmail}/photo`;
    this.storage.ref(this.filePath).putString(finalUrl);
    this.userAccountService.updatePhoto(this.userEmail, finalUrl);
  }
}

import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {concatMap, last} from 'rxjs/operators';
import {UserAccountService} from 'src/app/services/user-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEmail: string;
  userName: string;
  editName: boolean = false;
  updatedName: string;
  editPwd: boolean = false;
  updatedPwd: string;
  downloadUrl$: Observable<string>;



  constructor(
      private userAccountService: UserAccountService,
      private storage: AngularFireStorage) {}

  ngOnInit() {
    this.userEmail = this.userAccountService.loggedinUser.email;
    this.userName = this.userAccountService.loggedinUser.userName;
  }

  onUserName(event: Event) {
    this.updatedName = (<HTMLInputElement>event.target).value;
  }

  onPwd(event: Event) {
    this.updatedPwd = (<HTMLInputElement>event.target).value;
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `profilePhotos/${this.userEmail}/${file.name}`;
    const task = this.storage.upload(filePath, file);
    this.downloadUrl$ = task.snapshotChanges().pipe(
        last(), concatMap(() => this.storage.ref(filePath).getDownloadURL()));

    // const latestUrl$ = this.downloadUrl$.pipe(
    //   concatMap(url => this.userAccountService.)
    // )
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {concatMap, last} from 'rxjs/operators';
import {ImageService} from 'src/app/services/image.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  // current user info
  userEmail: string;
  userName: string;
  userPhotoUrl: string;
  private userSub: Subscription;

  // allow edit
  editName: boolean = false;
  editPhoto: boolean = false;
  editPwd: boolean = false;

  // updated user info
  updatedName: string;
  updatedPwd: string;

  // edit photo
  file: any;         // the original photo file
  testPath: string;  // the path in storage for the photo before cropper
  downloadUrl$: Observable<string>;  // the photo version before cropper
  private urlSub: Subscription;
  testUrl: string;   // the photo url before cropper
  filePath: string;  // the path in storage for the final version

  // errors
  errorPwd: string;
  errorName: string;
  successfulUpdateMessage1: string;
  successfulUpdateMessage2: string;
  errorPhoto: string;

  // background image
  profileUrl: string = '';

  constructor(
      private userService: UserService, private storage: AngularFireStorage,
      private imageService: ImageService) {}

  async ngOnInit() {
    this.profileUrl = await this.imageService.loadImg(
        'imgAssets/shutterstock_1472672846 (1).png');
    this.userSub = this.userService.activeUser.subscribe(user => {
      this.userName = user.userName;
      this.userEmail = user.email;
      this.userPhotoUrl = user.photoUrl;
    });
  }

  async updateInfo(formData: NgForm) {
    this.updatedName = formData.value.userName;
    this.updatedPwd = formData.value.password;

    if (this.editPwd) {
      await this.userService.updatePwd(this.updatedPwd).catch((error) => {
        this.errorPwd = 'Error in updating password: ' + error.message;
        console.log(this.errorPwd)
      });
    };
    if (this.editName) {
      await this.userService.updateName(this.userEmail, this.updatedName)
          .then((_) => {
            const newUser = {
              email: this.userService.activeUser.value.email,
              userName: this.updatedName,
              defaultPhoto: this.userService.activeUser.value.defaultPhoto,
              photoUrl: this.userService.activeUser.value.photoUrl
            };
            this.userService.activeUser.next(newUser)
          })
          .catch((e) => {
            this.errorName = 'Error in updating name: ' + e.message;
            console.log(this.errorName)
          });
    };
    if ((!this.editPwd || (this.editPwd && !this.errorPwd)) &&
        (!this.editName || (this.editName && !this.errorName))) {
      console.log(!this.editPwd, this.errorPwd, !this.editName, this.errorName);
      this.successfulUpdateMessage1 = 'Updated Successfully!'
    }
  };

  uploadFile(event) {
    this.editPhoto = true;
    this.file = event.target.files[0];
    this.testPath = `profilePhotos/${this.userEmail}/test/${this.file.name}`;
    const task = this.storage.upload(this.testPath, this.file);
    this.downloadUrl$ = task.snapshotChanges().pipe(
        last(),
        concatMap(() => this.storage.ref(this.testPath).getDownloadURL()));

    this.urlSub = this.downloadUrl$.subscribe(url => {
      this.testUrl = url;
    });
  }

  async uploadPhoto(finalUrl: string) {
    console.log(finalUrl);
    // this.filePath = `profilePhotos/${this.userEmail}/photo`;
    // this.storage.ref(this.filePath).putString(finalUrl);
    await this.userService.updatePhoto(this.userEmail, finalUrl)
        .then((_) => {
          this.editPhoto = false;
          this.successfulUpdateMessage2 = 'Updated Successfully!';
          const newUser = {
            email: this.userService.activeUser.value.email,
            userName: this.userService.activeUser.value.userName,
            defaultPhoto: false,
            photoUrl: finalUrl
          };
          this.userService.activeUser.next(newUser)
        })
        .catch((e) => {
          this.errorPhoto = 'Error occurs in uploading photo: ' + e.message;
        });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    if (this.urlSub) {
      this.urlSub.unsubscribe();
    }
  }
}

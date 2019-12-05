import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit, OnDestroy {
  userName: string;
  userPhotoURL: string;
  defaultPhoto: boolean;
  private userSub: Subscription;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    await this.userService.refreshPending;
    this.userSub = this.userService.activeUser.subscribe(user => {
      console.log('ngOnInit, previous user is ', user);
      this.userName = user.userName;
      this.userPhotoURL = user.photoUrl;
      this.defaultPhoto = user.defaultPhoto;
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

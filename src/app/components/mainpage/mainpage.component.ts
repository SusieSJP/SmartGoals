import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/model/user';
import {UserAccountService} from 'src/app/services/user-account.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  user: User;
  isMainpage: boolean = true;
  pageName: string;

  defaultProfileImgUrl: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef';
  mainpageImgUrl: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fshutterstock_1476518783.png?alt=media&token=2050956f-bd8b-4ef1-bce4-df852b36f561';
  bgImgUrlNewGoal: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fnewgoal.png?alt=media&token=434d4f8b-ad74-4572-b434-dfe9af128adb';
  bgImgUrlProfile: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fshutterstock_1472672846%20(1).png?alt=media&token=83d9573a-623e-487c-a069-451c0dac3eaa';
  bgImgUrlGoalM: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fshutterstock_1476500120%20(2).png?alt=media&token=380f869f-9840-4ab1-8e8f-c603c51494e2';
  bgImgUrlProgress: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fshutterstock_1476510743.png?alt=media&token=eba169ec-0293-43b5-b325-1ac3af59d141';

  constructor(private userAccountService: UserAccountService) {}

  ngOnInit() {
    if (this.userAccountService.loggedinUser != null) {
      this.user = this.userAccountService.loggedinUser;
    } else {
      this.user = {
        email: 'test',
        userName: 'Default Name',
        photoUrl: this.defaultProfileImgUrl
      };
    }
  };

  changePageToNewGoal() {
    this.isMainpage = false;
    this.pageName = 'newGoal';
  };

  changePageToGoalManagemennt() {
    this.isMainpage = false;
    this.pageName = 'goalManagement';
  };

  changePageToProgress() {
    this.isMainpage = false;
    this.pageName = 'progress';
  };

  changePageToProfile() {
    this.isMainpage = false;
    this.pageName = 'editProfile';
  };
}

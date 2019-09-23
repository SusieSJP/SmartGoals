import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/model/user';
import {UserAccountService} from 'src/app/services/user-account.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  user: User;

  constructor(private userAccountService: UserAccountService) {}

  ngOnInit() {
    if (this.userAccountService.loggedinUser != null) {
      this.user = this.userAccountService.loggedinUser;
    } else {
      this.user = {email: 'test', userName: 'Default Name'};
    }
  }
}

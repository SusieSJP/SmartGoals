import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {UserAccountService} from './user-account.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(
      private router: Router, private userAccountService: UserAccountService) {}

  canActivate() {
    if (this.userAccountService.isLoggedin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

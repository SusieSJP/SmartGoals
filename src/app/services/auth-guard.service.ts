import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate() {
    await this.userService.refreshPending;
    if (this.userService.isLoggedin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../model/user';

import {UserAccountService} from './user-account.service';

@Injectable()
export class FakeUserAccountService extends UserAccountService {
  activeUser = new BehaviorSubject<User|null>(null);
  private user: User|null;
  get loggedinUser(): User|null {
    return this.user;
  }
  set loggedinUser(value: User|null) {
    this.user = value;
    this.activeUser.next(value);
  }
  accounts = new Map<string, User>();
  emailPwds = new Map<string, string>();

  constructor() {
    super();
    this.accounts.set('test@t.com', {email: 'test@t.com', userName: 'test'});
    this.emailPwds.set('test@t.com', 'pwd');
  }

  signUp(email: string, uName: string, pwd: string) {
    const user = {email, userName: uName};
    this.accounts.set(email, user);
    this.emailPwds.set(email, pwd);
    this.loggedinUser = user;
  }

  loginWithEmail(email: string, pwd: string) {
    if (pwd !== this.emailPwds.get(email)) {
      return null;
    }
    this.loggedinUser = this.accounts.get(email);
  }

  loginWithGoogle() {}

  logout() {
    this.loggedinUser = null;
  }
}

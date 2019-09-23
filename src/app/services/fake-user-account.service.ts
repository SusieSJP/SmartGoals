import {User} from '../model/user';
import {UserAccountService} from './user-account.service';

export class FakeUserAccountService extends UserAccountService {
  loggedinUser: User;
  accounts = new Map<string, User>();
  emailPwds = new Map<string, string>();

  constructor() {
    super();
    this.accounts.set('test@t.com', {email: 'test@t.com', userName: 'test'});
    this.emailPwds.set('test@t.com', 'pwd');
  }

  signUp(email: string, uName: string, pwd: string) {
    this.accounts.set(email, {email: email, userName: uName});
    this.emailPwds.set(email, pwd);
  }

  login(email: string, pwd: string) {
    if (pwd != this.emailPwds.get(email)) {
      return null;
    }
    this.loggedinUser = this.accounts.get(email);
    return this.loggedinUser;
  }
}

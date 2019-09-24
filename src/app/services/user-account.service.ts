import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../model/user';

@Injectable()
export abstract class UserAccountService {
  activeUser: Observable<User|null>;
  loggedinUser: User|null;

  abstract signUp(email: string, uName: string, pwd: string): void;
  abstract loginWithEmail(email: string, pwd: string): void;
  abstract loginWithGoogle(): void;
  abstract logout(): void;
}

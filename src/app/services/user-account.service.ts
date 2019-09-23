import {Injectable} from '@angular/core';
import {User} from '../model/user';


export abstract class UserAccountService {
  loggedinUser: User;

  abstract signUp(email: string, uName: string, pwd: string): void;
  abstract login(email: string, pwd: string): User;
}

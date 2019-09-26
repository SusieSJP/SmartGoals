import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {auth} from 'firebase/app';
import {BehaviorSubject} from 'rxjs';

import {User} from '../model/user';

@Injectable()
export class AngularFireGoalManagementService {
  constructor(public afStore: AngularFirestore) {}
}

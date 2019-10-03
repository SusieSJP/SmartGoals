import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {Goal} from '../model/goal';
import {User} from '../model/user';

import {GoalManagementService} from './goal-management.service';
import {UserAccountService} from './user-account.service';

@Injectable()
export class AngularFireGoalManagementService extends GoalManagementService
    implements OnDestroy {
  activeGoals$ = new Observable<Goal[]>();
  private goals: Goal[]|null;

  private goalsSubscription: Subscription;

  getCurrGoals(): Goal[]|null {
    return this.goals;
  }

  constructor(
      public afDatabase: AngularFirestore,
      userAccountService: UserAccountService) {
    super();
    this.activeGoals$ = userAccountService.activeUser.pipe(switchMap(
        (user: User|null) => user === null ? [] : this.fetchGoals(user.email)));
    this.goalsSubscription =
        this.activeGoals$.subscribe((goals) => this.goals = goals);
  }

  private fetchGoals(email: string): Observable<Goal[]> {
    return this.afDatabase
        .collection<any>(
            'goals',
            ref => ref.orderBy('startDate').where('userEmail', '==', email))
        .snapshotChanges()
        .pipe(
            map(actions => actions.map(
                    snap => ({
                      id: snap.payload.doc.id,
                      name: snap.payload.doc.data().name,
                      startDate: snap.payload.doc.data().startDate.toDate(),
                      endDate: snap.payload.doc.data().endDate.toDate(),
                      workload: snap.payload.doc.data().workload,
                      avgWorkload: snap.payload.doc.data().avgWorkload,
                      dailyProgress: snap.payload.doc.data().dailyProgress,
                      groups: snap.payload.doc.data().groups,
                      userEmail: snap.payload.doc.data().userEmail,
                    } as Goal))));
  }

  addGoal(
      name: string, startDate: Date, endDate: Date, workload: number,
      avgWorkload: number, email: string): void {
    const diffDays =
        (endDate.valueOf() - startDate.valueOf()) / (1000 * 3600 * 24);
    const dailyProgress = Array.from({length: diffDays}).fill(0);
    const groups: number[] = [];

    this.afDatabase.collection('goals').add({
      name,
      startDate,
      endDate,
      workload,
      avgWorkload,
      dailyProgress,
      groups,
      userEmail: email
    });
  }

  getGoal(id: string): Observable<Goal> {
    return this.afDatabase.collection('goals').doc(id).snapshotChanges().pipe(
        map(snap => ({id: snap.payload.id, ...snap.payload.data()} as Goal)));
  }

  updateProgress(newProgress:
                     Map<string, {id: string, date: Date, progress: number}>) {
    newProgress.forEach((progressInfo, key) => {
      this.afDatabase.collection('goals')
          .doc(progressInfo.id)
          .get()
          .subscribe((goal) => {
            const prevProgress = goal.get('dailyProgress');
            const start = goal.get('startDate').toDate();
            const index = Math.floor(
                (progressInfo.date.valueOf() - start.valueOf()) /
                (1000 * 3600 * 24));
            prevProgress[index] = progressInfo.progress;

            this.afDatabase.collection('goals')
                .doc(progressInfo.id)
                .update({dailyProgress: prevProgress})
                .then(() => {
                  console.log('Document successfully updated!');
                });
          });
    });
  }

  ngOnDestroy() {
    this.goalsSubscription.unsubscribe();
  }
}

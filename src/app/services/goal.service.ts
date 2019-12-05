import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {DocumentReference} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs';
import {resolve} from 'url';

import {Goal} from '../model/goal';

import {UserService} from './user.service';

@Injectable()
export class GoalService implements OnInit, OnDestroy {
  database = firebase.firestore();
  activeGoals$ = new BehaviorSubject<Goal[]>(null);
  unsubscribeGoalArr: any;
  activeUserEmail: string;
  onUpdating: Promise<void>;
  updateResults: boolean[];
  // private goals: Goal[]|null;

  // private goalsSubscription: Subscription;

  // getCurrGoals(): Goal[]|null {
  //   return this.goals;
  // }

  constructor(private userService: UserService) {
    this.activeUserEmail = this.userService.activeUser.value.email;
    console.log('userEmail from goal service: ', this.activeUserEmail);
    // super();
    // this.activeGoals$ = userAccountService.activeUser.pipe(switchMap(
    //     (user: User|null) => user === null ? [] :
    //     this.fetchGoals(user.email)));
    // this.goalsSubscription =
    //     this.activeGoals$.subscribe((goals) => this.goals = goals);
  }

  ngOnInit() {
    this.unsubscribeGoalArr =
        this.database.collection('users')
            .doc(this.activeUserEmail)
            .collection('goals')
            .onSnapshot((snapshot) => {
              let goals: Goal[] = [];

              snapshot.forEach((doc) => {
                let goal = new Goal(
                    doc.id, doc.data().name, doc.data().startDate.toDate(),
                    doc.data().endDate.toDate(), doc.data().workload,
                    doc.data().avgWorkload, doc.data().dailyProgress);
                goals.push(goal);
              });

              this.activeGoals$.next(goals);
            })
  }

  async loadGoalData() {
    await this.database.collection('users')
        .doc(this.activeUserEmail)
        .collection('goals')
        .get()
        .then((snapshot) => {
          let goals: Goal[] = [];

          snapshot.forEach((doc) => {
            let goal = new Goal(
                doc.id, doc.data().name, doc.data().startDate.toDate(),
                doc.data().endDate.toDate(), doc.data().workload,
                doc.data().avgWorkload, doc.data().dailyProgress);
            goals.push(goal);
          });

          this.activeGoals$.next(goals);
        })
  }
  // private fetchGoals(email: string): Observable<Goal[]> {
  //   return this.database
  //       .collection('goals')
  //       .snapshotChanges()
  //       .pipe(
  //           map(actions => actions.map(
  //                   snap => ({
  //                     id: snap.payload.doc.id,
  //                     name: snap.payload.doc.data().name,
  //                     startDate: snap.payload.doc.data().startDate.toDate(),
  //                     endDate: snap.payload.doc.data().endDate.toDate(),
  //                     workload: snap.payload.doc.data().workload,
  //                     avgWorkload: snap.payload.doc.data().avgWorkload,
  //                     dailyProgress: snap.payload.doc.data().dailyProgress,
  //                     groups: snap.payload.doc.data().groups,
  //                     userEmail: snap.payload.doc.data().userEmail,
  //                   } as Goal))));
  // }

  addGoal(
      name: string, startDate: Date, endDate: Date, workload: number,
      avgWorkload: number): Promise<DocumentReference> {
    const diffDays =
        (endDate.valueOf() - startDate.valueOf()) / (1000 * 3600 * 24);
    const dailyProgress = Array.from({length: diffDays}).fill(0);

    // using add to let Cloud Firestore auto-generate an ID for goal
    return this.database.collection('users')
        .doc(this.activeUserEmail)
        .collection('goals')
        .add({name, startDate, endDate, workload, avgWorkload, dailyProgress});
  }

  updateProgress(newProgress:
                     Map<string, {name: string, date: Date, progress: number}>):
      Promise<{name: string, res: boolean}[]> {
    console.log('input new progress array is: ', newProgress);
    // let updateResults: Promise<boolean>[] = [];
    let updateResults: Promise<{name: string, res: boolean}>[] = [];
    newProgress.forEach((progressInfo, id) => {
      if (progressInfo.progress > 0) {
        const updateRes: Promise<{name: string, res: boolean}> =
            this.database.collection('users')
                .doc(this.activeUserEmail)
                .collection('goals')
                .doc(id)
                .get()
                .then((goal) => {
                  console.log('updating on ', goal.id);
                  const prevProgress = goal.get('dailyProgress');
                  const start = goal.get('startDate').toDate();
                  const index = Math.floor(
                      (progressInfo.date.valueOf() - start.valueOf()) /
                      (1000 * 3600 * 24));
                  prevProgress[index] = progressInfo.progress;

                  return this.database.collection('users')
                      .doc(this.activeUserEmail)
                      .collection('goals')
                      .doc(id)
                      .update({dailyProgress: prevProgress});
                })
                .then(() => {
                  console.log('update sucessful on ', id);
                  return {name: progressInfo.name, res: true};
                })
                .catch(() => {
                  console.log('update failed on ', id);
                  return {name: progressInfo.name, res: false};
                });
        updateResults.push(updateRes);
      };
    });
    return Promise.all(updateResults);
  }

  ngOnDestroy() {
    // this.goalsSubscription.unsubscribe();
    this.unsubscribeGoalArr();
  }
}

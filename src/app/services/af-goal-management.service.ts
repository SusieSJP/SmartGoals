import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Goal} from '../model/goal';

import {GoalManagementService} from './goal-management.service';

@Injectable()
export class AngularFireGoalManagementService extends GoalManagementService {
  activeGoals = new BehaviorSubject<Goal[]|null>(null);
  private goals: Goal[]|null;

  get currGoals(): Goal[]|null {
    return this.goals;
  }
  set currGoals(value: Goal[]|null) {
    this.goals = value;
    this.activeGoals.next(value);
  }

  constructor(public afDatabase: AngularFirestore) {
    super();
  }

  getGoals(email: string): Observable<Goal[]> {
    return this.afDatabase
        .collection<any>(
            'goals',
            ref => ref.orderBy('startDate').where('userEmail', '==', email))
        .snapshotChanges()
        .pipe(map(actions => {
          this.currGoals = actions.map(snap => <Goal>{
            id: snap.payload.doc.id,
            name: snap.payload.doc.data().name,
            startDate: snap.payload.doc.data().startDate.toDate(),
            endDate: snap.payload.doc.data().endDate.toDate(),
            workload: snap.payload.doc.data().workload,
            avgWorkload: snap.payload.doc.data().avgWorkload,
            dailyProgress: snap.payload.doc.data().dailyProgress,
            groups: snap.payload.doc.data().groups,
            userEmail: snap.payload.doc.data().userEmail,
          });
          return this.currGoals;
        }));

    // .snapshotChanges()
    // .pipe(map(actions => {
    //   let snap = actions[0];
    //   this.currGoals =  {
    //     const goal = <Goal>{
    //       id: snap.payload.doc.id,
    //       name: snap.payload.doc.data().name,
    //       startDate: snap.payload.doc.data().startDate.toDate(),
    //       endDate: snap.payload.doc.data().endDate.toDate(),
    //       workload: snap.payload.doc.data().workload,
    //       avgWorkload: snap.payload.doc.data().avgWorkload,
    //       dailyProgress: snap.payload.doc.data().dailyProgress,
    //       groups: snap.payload.doc.data().groups,
    //       userEmail: snap.payload.doc.data().userEmail,
    //     };
    //   });
    //   return this.currGoals;
    // }));
  }

  addGoal(
      name: string, startDate: Date, endDate: Date, workload: number,
      avgWorkload: number, email: string) {
    let diffDays =
        (endDate.valueOf() - startDate.valueOf()) / (1000 * 3600 * 24);
    let dailyProgress = Array.from({length: diffDays}).fill(0);
    let groups: number[] = [];

    this.afDatabase.collection('goals').add({
      name,
      startDate,
      endDate,
      workload,
      avgWorkload,
      dailyProgress,
      groups,
      userEmail: email
    })
  };

  getGoal(id: string) {
    return this.afDatabase.collection('goals').doc(id).snapshotChanges().pipe(
        map(snap => {
          return <Goal> {
            id: snap.payload.id, ...snap.payload.data()
          }
        }))
  }

  updateProgress(newProgress:
                     Map<string, {id: string, date: Date, progress: number}>) {
    newProgress.forEach((progressInfo, key) => {
      this.afDatabase.collection('goals')
          .doc(progressInfo.id)
          .get()
          .subscribe((goal) => {
            let prevProgress = goal.get('dailyProgress');
            let start = goal.get('startDate').toDate();
            let index = Math.floor(
                (progressInfo.date.valueOf() - start.valueOf()) /
                (1000 * 3600 * 24));
            prevProgress[index] = progressInfo.progress;

            this.afDatabase.collection('goals')
                .doc(progressInfo.id)
                .update({dailyProgress: prevProgress})
                .then(function() {
                  console.log('Document successfully updated!');
                });
          });
    })
  };
}

import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

import {Goal} from '../model/goal';

import {GoalManagementService} from './goal-management.service';

@Injectable()
export class AngularFireGoalManagementService extends GoalManagementService {
  constructor(public afDatabase: AngularFirestore) {
    super();
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

  getGoals(email: string) {
    return this.afDatabase
        .collection(
            'goals',
            ref => ref.orderBy('startDate').where('userEmail', '==', email))
        .snapshotChanges()
        .pipe(
            map(snaps => {return snaps.map(snap => {
                  return <Goal>{
                    id: snap.payload.doc.id,
                    ...snap.payload.doc.data()
                  };
                })}),
            // adding first operator here to prevent the realtime change
            // without enduser interaction
            first());
  }

  updateProgress(newProgress:
                     Map<string, {id: string, date: Date, progress: number}>) {
    newProgress.forEach(
        (progressInfo,
         key) => {this.afDatabase.collection('goals')
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
                      })})
  };
}

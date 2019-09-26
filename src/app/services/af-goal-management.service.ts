import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map} from 'rxjs/operators';

import {Goal} from '../model/goal';

@Injectable()
export class AngularFireGoalManagementService {
  constructor(public afDatabase: AngularFirestore) {}

  getGoals(email: string) {
    return this.afDatabase.collection('goals', ref => ref.orderBy('startDate'))
        .snapshotChanges()
        .pipe(
            map(snaps => {return snaps
                              .map(snap => {
                                return <Goal>{
                                  id: snap.payload.doc.id,
                                  ...snap.payload.doc.data()
                                };
                              })
                              .filter(goal => goal.userEmail === email)}),
            // adding first operator here to prevent the realtime change without
            // enduser interaction
            first());
  }

  updateProgress(newProgress: Map<{id: string, d: Date}, number>) {
    newProgress.forEach((progress, key) => {
      console.log(this.afDatabase.collection('goals').doc(key.id).get());}
    //   newProgress.forEach((progress, key) => {
    //     let docRef = this.afDatabase.collection('goals').doc(key.id);
    //     docRef.get().
    //     console.log(this.afDatabase.collection('goals').doc(key.id).get();
    //     // newProgress.forEach(
    //     //     (progress, key) => {
    //     //       let prevProgress =
    //     //
    //     this.afDatabase.collection('goals').doc(key.id).get('dailyProgress');
    //     //       this.afDatabase.collection('goals').doc(key.id).update()})
    //   })
    // };
  }

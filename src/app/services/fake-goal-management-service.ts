// import {Injectable} from '@angular/core';
// import {Goal} from '../model/goal';
// import {GoalManagementService} from './goal-management.service';

// @Injectable()
// export class FakeGoalManagementService extends GoalManagementService {
//   goal: Goal;
//   // Key is the goal-id and the value is the specific info of each goal.
//   goals = new Map<number, Goal>();
//   // Key is the user email and the value is the goal id.
//   userGoals = new Map<string, number[]>();

//   constructor() {
//     super();
//   }

//   addGoal(
//       name: string, startDate: Date, endDate: Date, workload: number,
//       avgWorkload: number, userEmail: string) {
//     const id = this.goals.size;
//     let diffDays =
//         (endDate.valueOf() - startDate.valueOf()) / (1000 * 3600 * 24);
//     let dailyProgress = Array.from({length: diffDays}).fill(0);
//     let groups: number[] = [];

//     this.goal = {
//       id,
//       name,
//       startDate,
//       endDate,
//       workload,
//       avgWorkload,
//       dailyProgress,
//       groups,
//       userEmail
//     };

//     this.goals.set(id, this.goal);
//     // If user has at least one goal
//     if (this.userGoals.has(userEmail)) {
//       this.userGoals.get(userEmail).push(this.goal.id);
//     } else {
//       let goalArr: number[] = [];
//       goalArr.push(this.goal.id);
//       this.userGoals.set(userEmail, goalArr);
//     }
//   }

//   // Get the detail information of a specific goal.
//   getGoal(id: number): Goal {
//     return this.goals.get(id);
//   }

//   // Get all the goals of the user.
//   getGoals(userEmail: string): number[] {
//     return this.userGoals.get(userEmail);
//   }

//   updateProgress(id: number, date: Date, progress: number): void {
//     const editGoal = this.goals.get(id);
//     let index =
//         (date.valueOf() - editGoal.startDate.valueOf()) / (1000 * 3600 * 24);

//     editGoal.dailyProgress[index] = progress;
//   }
// }

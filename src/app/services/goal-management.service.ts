import {Injectable} from '@angular/core';
import {Goal} from '../model/goal';

@Injectable()
export abstract class GoalManagementService {
  goal: Goal;
  // Key is the goal-id and the value is the specific info of each goal.
  goals = new Map<number, Goal>();
  // Key is the user email and the value is the goal id.
  userGoals = new Map<string, number[]>();
  // Key is the composite variable (email+goalname) and value is the goal id.
  goalIdentifiers = new Map<string, number>();

  abstract addGoal(
      name: string, startDate: Date, endDate: Date, workload: number,
      avgWorkload: number, userEmail: string): void;
  abstract getGoal(goalKey: string): Goal;
  abstract getGoals(userEmail: string): number[];
  abstract updateProgress(id: number, date: Date, progress: number): void;
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Goal} from '../model/goal';

@Injectable()
export abstract class GoalManagementService {
  activeGoals: Observable<Goal[]|null>;
  currGoals: Goal[];

  abstract addGoal(
      name: string, startDate: Date, endDate: Date, workload: number,
      avgWorkload: number, userEmail: string): void;
  abstract getGoal(id: string): Observable<Goal>;
  abstract getGoals(userEmail: string): Observable<Goal[]>;
  abstract updateProgress(Map): void;
}

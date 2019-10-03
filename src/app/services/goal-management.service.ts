import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Goal} from '../model/goal';

@Injectable()
export abstract class GoalManagementService {
  activeGoals$: Observable<Goal[]>;

  abstract getCurrGoals(): Goal[]|null;
  abstract addGoal(
      name: string, startDate: Date, endDate: Date, workload: number,
      avgWorkload: number, userEmail: string): void;
  abstract getGoal(id: string): Observable<Goal>;
  abstract updateProgress(Map): void;
}

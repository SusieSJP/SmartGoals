import {Component, OnInit} from '@angular/core';
import {OverviewType} from 'angular2-calendar-heatmap';
import {Observable} from 'rxjs';
import {Goal} from 'src/app/model/goal';
import {GoalManagementService} from 'src/app/services/goal-management.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  panelOpenState = false;
  goalArr$: Observable<Goal[]|null>;
  userEmail: string;
  overview = OverviewType.year;

  constructor(private goalService: GoalManagementService) {
    this.goalArr$ = this.goalService.activeGoals$;
  }

  ngOnInit() {}

  getOverallProgress(goal: Goal): number {
    return Math.round(
        goal.dailyProgress.reduce((a, b) => a + b) / goal.workload * 100);
  }
}

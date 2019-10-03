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

  getProgressData(goal: Goal): Array<{date: Date, total: number, details: []}> {
    const newData = new Array<{date: Date, total: number, details: []}>();
    const curDate = new Date(goal.startDate);

    for (const progress of goal.dailyProgress) {
      newData.push({date: new Date(curDate), total: progress, details: []});
      curDate.setDate(curDate.getDate() + 1);
    }
    return newData;
  }
}

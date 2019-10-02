import {Component, OnInit} from '@angular/core';
import {OverviewType} from 'angular2-calendar-heatmap';
import {Goal} from 'src/app/model/goal';
import {GoalManagementService} from 'src/app/services/goal-management.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  panelOpenState = false;
  goalArr: Goal[];
  userEmail: string;
  overview = OverviewType.year;

  constructor(private afGoalService: GoalManagementService) {}

  ngOnInit() {
    this.goalArr = this.afGoalService.currGoals;
  }
  getOverallProgress(goal: Goal): number {
    return Math.round(
        goal.dailyProgress.reduce((a, b) => a + b) / goal.workload * 100);
  }

  getProgressData(goal: Goal): Array<{date: Date, total: number, details: []}> {
    let newData = new Array<{date: Date, total: number, details: []}>();
    let curDate = new Date(goal.startDate);
    let i = 0;

    for (i; i < goal.dailyProgress.length; i++) {
      newData.push(
          {date: new Date(curDate), total: goal.dailyProgress[i], details: []});
      curDate.setDate(curDate.getDate() + 1);
    }
    return newData;
  }
}

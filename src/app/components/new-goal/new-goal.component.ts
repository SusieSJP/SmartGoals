import {Component, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {GoalManagementService} from 'src/app/services/goal-management.service';
import {UserAccountService} from 'src/app/services/user-account.service';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent implements OnInit {
  goalName: string;
  // goal workload is the total number of works before complete the goal
  goalWorkload: number;
  goalStartDate: Date;
  goalEndDate: Date;
  // diffDays is the total length of the working period
  diffDays: number = 0;
  // avgWorkload is the expected daily workload
  avgWorkload: number = 0.0;

  constructor(
      private goalManagementService: GoalManagementService,
      private userAccountService: UserAccountService) {}

  ngOnInit() {}

  onGoalName(event: Event) {
    this.goalName = (<HTMLInputElement>event.target).value;
  }
  onGoalWorkload(event: Event) {
    this.goalWorkload = +(<HTMLInputElement>event.target).value;
  }
  onStartDate(event: MatDatepickerInputEvent<Date>) {
    this.goalStartDate = event.value;
  }
  onEndDate(event: MatDatepickerInputEvent<Date>) {
    this.goalEndDate = event.value;
    if (this.goalStartDate && this.goalStartDate < this.goalEndDate) {
      this.diffDays =
          (this.goalEndDate.valueOf() - this.goalStartDate.valueOf()) /
          (1000 * 3600 * 24);
      this.avgWorkload = this.goalWorkload / this.diffDays;
    }
  }

  onCreateGoal() {
    this.goalManagementService.addGoal(
        this.goalName, this.goalStartDate, this.goalEndDate, this.goalWorkload,
        this.avgWorkload, this.userAccountService.loggedinUser.email);
  }
}

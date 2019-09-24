import {Component, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FakeGoalManagementService} from 'src/app/services/fake-goal-management-service';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent implements OnInit {
  goalName: string;
  goalWorkload: number;
  goalStartDate: Date;
  goalEndDate: Date;
  diffDays: number = 0;
  avgWorkload: number = 0.0;

  constructor(
      private goalManagementService: FakeGoalManagementService,
      private route: ActivatedRoute) {}

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
    this.goalManagementService.setGoal(
        this.goalName, this.goalStartDate, this.goalEndDate, this.goalWorkload,
        this.avgWorkload);

    let goalKey = this.goalName + this.route.params['username'];
    let newGoal = this.goalManagementService.getGoal(goalKey);
    this.goalManagementService.addGoal(newGoal, this.route.params['username']);
  }
}

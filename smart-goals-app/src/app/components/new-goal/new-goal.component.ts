import {Component, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent implements OnInit {
  goalName: string;
  goalStartDate: Date;
  goalEndDate: Date;
  goalWorkload: number;
  diffDays: number = 0;
  avgWorkload: number = 0.0;

  constructor() {}

  ngOnInit() {}

  onCreateGoalName(event: Event) {
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
}

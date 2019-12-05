import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material';
import {GoalService} from 'src/app/services/goal.service';
import {ImageService} from 'src/app/services/image.service';

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
  newGoalUrl: string = '';

  // result of adding new goal
  isLoading: boolean = false;
  successfulMsg: string;
  errorMsg: string;

  constructor(
      // private afGoalService: AngularFireGoalManagementService,
      private goalService: GoalService, private imgService: ImageService) {}

  async ngOnInit() {
    this.newGoalUrl = await this.imgService.loadImg('imgAssets/newgoal.png');
  }

  onGoalName(event: Event) {
    this.goalName = (<HTMLInputElement>event.target).value;
  }
  onGoalWorkload(event: Event) {
    this.goalWorkload = +(<HTMLInputElement>event.target).value;
    if (this.goalStartDate && this.goalEndDate &&
        this.goalStartDate < this.goalEndDate) {
      this.diffDays = Math.floor(
          (this.goalEndDate.valueOf() - this.goalStartDate.valueOf()) /
          (1000 * 3600 * 24));
      this.avgWorkload = this.goalWorkload / this.diffDays;
    }
  }
  onStartDate(event: MatDatepickerInputEvent<Date>) {
    this.goalStartDate = event.value;
    if (this.goalEndDate && this.goalStartDate < this.goalEndDate) {
      this.diffDays = Math.floor(
          (this.goalEndDate.valueOf() - this.goalStartDate.valueOf()) /
          (1000 * 3600 * 24));
      this.avgWorkload = this.goalWorkload / this.diffDays;
    }
  }
  onEndDate(event: MatDatepickerInputEvent<Date>) {
    this.goalEndDate = event.value;
    if (this.goalStartDate && this.goalStartDate < this.goalEndDate) {
      this.diffDays = Math.floor(
          (this.goalEndDate.valueOf() - this.goalStartDate.valueOf()) /
          (1000 * 3600 * 24));
      this.avgWorkload = this.goalWorkload / this.diffDays;
    }
  }

  onCreateGoal(form: NgForm) {
    this.isLoading = true;
    this.goalService
        .addGoal(
            this.goalName, this.goalStartDate, this.goalEndDate,
            this.goalWorkload, this.avgWorkload)
        .then(() => {
          this.isLoading = false;
          this.successfulMsg = 'New goal added!';
          this.errorMsg = '';
          form.reset();
        })
        .catch((error) => {
          this.isLoading = false;
          this.errorMsg = error.message;
          this.successfulMsg = '';
        });
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Goal} from 'src/app/model/goal';
import {GoalService} from 'src/app/services/goal.service';
import {ImageService} from 'src/app/services/image.service';

@Component({
  selector: 'app-goal-management',
  templateUrl: './goal-management.component.html',
  styleUrls: ['./goal-management.component.css']
})
export class GoalManagementComponent implements OnInit {
  // date is the variable that user picks in the calender, the default value is
  // today.
  date = new FormControl(new Date());
  goalArr: Goal[];
  userEmail: string;
  // the key of the newProgress is the combination of goalId and date, the value
  // is the progress number
  newProgress = new Map<string, {name: string, date: Date, progress: number}>();

  goalManageUrl: string = '';

  isLoading = false;
  updateMsg: string[] = [];

  constructor(
      private goalService: GoalService, private router: Router,
      private route: ActivatedRoute, private imageService: ImageService) {}

  async ngOnInit() {
    this.goalManageUrl = await this.imageService.loadImg(
        'imgAssets/shutterstock_1476500120 (2).png');
    await this.goalService.loadGoalData();
    this.goalService.activeGoals$.subscribe((goals) => {
      this.goalArr = goals;
    });
    console.log('goal Arr for goal management component: ', this.goalArr);
  }

  onTempEditProgress(id: string, name: string, event: Event) {
    this.updateMsg = [];
    const changedDate: Date = this.date.value;
    const progress: number = +(<HTMLInputElement>event.target).value;
    this.newProgress.set(id, {name, date: changedDate, progress});
  }

  onUpdateProgress() {
    this.isLoading = true;
    this.goalService.updateProgress(this.newProgress).then((results) => {
      this.isLoading = false;
      results.forEach((res) => {
        if (!res) {
          this.updateMsg.push(`Update Failed on ${res.name}`);
        } else {
          this.updateMsg.push(`Update Successful on ${res.name}`);
        }
      });
      this.newProgress =
          new Map<string, {name: string, date: Date, progress: number}>();
      let inputArray = document.querySelectorAll('input');
      inputArray.forEach((input) => input.value = '');
    })
  }

  directToProgress() {
    this.router.navigate(['../personal-progress'], {relativeTo: this.route});
  }

  getOverallProgress(goal: Goal): number {
    return Math.round(
        goal.dailyProgress.reduce((a, b) => a + b) / goal.workload * 100);
  }
}

import {Component, OnInit} from '@angular/core';
import {OverviewType} from 'angular2-calendar-heatmap';
import {Observable} from 'rxjs';
import {Goal} from 'src/app/model/goal';
import {GoalService} from 'src/app/services/goal.service';
import {ImageService} from 'src/app/services/image.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  panelOpenState = false;
  // goalArr$: Observable<Goal[]|null>;
  goalArr: Goal[];
  userEmail: string;
  overview = OverviewType.year;
  progressUrl: string = '';

  constructor(
      private goalService: GoalService, private imageService: ImageService) {
    // this.goalArr$ = this.goalService.activeGoals$;
  }

  async ngOnInit() {
    this.progressUrl = await this.imageService.loadImg(
        'imgAssets/shutterstock_1476510743.png');
    await this.goalService.loadGoalData();
    this.goalService.activeGoals$.subscribe((goals) => {
      this.goalArr = goals;
    });
    console.log('goal Arr for progress component: ', this.goalArr);
  }

  getOverallProgress(goal: Goal): number {
    return Math.round(
        goal.dailyProgress.reduce((a, b) => a + b) / goal.workload * 100);
  }
}

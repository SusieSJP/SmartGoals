import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Goal} from 'src/app/model/goal';
import {GoalManagementService} from 'src/app/services/goal-management.service';

@Component({
  selector: 'app-goal-management',
  templateUrl: './goal-management.component.html',
  styleUrls: ['./goal-management.component.css']
})
export class GoalManagementComponent implements OnInit {
  // date is the variable that user picks in the calender, the default value is
  // today.
  date = new FormControl(new Date());

  goalArr$: Observable<Goal[]|null>;
  userEmail: string;
  // the key of the newProgress is the combination of goalId and date, the value
  // is the progress number
  newProgress = new Map<string, {id: string, date: Date, progress: number}>();

  constructor(
      private goalService: GoalManagementService, private router: Router,
      private route: ActivatedRoute) {
    this.goalArr$ = this.goalService.activeGoals$;
  }

  ngOnInit() {}

  onTempEditProgress(id: string, event: Event) {
    let changedDate: Date = this.date.value;
    let key = id + changedDate.toLocaleDateString();
    this.newProgress.set(key, {
      id,
      date: changedDate,
      progress: +(<HTMLInputElement>event.target).value
    });
  }

  onUpdateProgress() {
    console.log(this.newProgress);
    this.goalService.updateProgress(this.newProgress);
  }

  directToProgress() {
    this.router.navigate(['../personal-progress'], {relativeTo: this.route});
  }

  getOverallProgress(goal: Goal): number {
    return Math.round(
        goal.dailyProgress.reduce((a, b) => a + b) / goal.workload * 100);
  }
}

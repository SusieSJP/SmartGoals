import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Goal} from 'src/app/model/goal';
import {GoalManagementService} from 'src/app/services/goal-management.service';
import {UserAccountService} from 'src/app/services/user-account.service';

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
  newProgress = new Map<string, {id: string, date: Date, progress: number}>();

  constructor(
      private afGoalService: GoalManagementService,
      private userAccountService: UserAccountService) {}

  ngOnInit() {
    this.userEmail = this.userAccountService.loggedinUser.email;
    this.afGoalService.getGoals(this.userEmail)
        .subscribe(goals => {this.goalArr = goals});
  }

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
    this.afGoalService.updateProgress(this.newProgress);
  }
}

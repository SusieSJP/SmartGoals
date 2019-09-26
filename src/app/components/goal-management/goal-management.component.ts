import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
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
  // the key of the newProgress is the combination of goalId and dateString
  newProgress: Map<string, {id: number, d: Date, progress: number}>;

  constructor(
      private goalManagementService: GoalManagementService,
      private userAccountService: UserAccountService) {}

  ngOnInit() {
    // this.goalArr =
    // this.goalManagementService.getGoals(this.userAccountService.loggedinUser.email);
    // this.userEmail = this.userAccountService.loggedinUser.email;
    this.goalArr = [
      {
        id: 0,
        name: 'goal1',
        startDate: new Date(2019, 9, 18),
        endDate: new Date(2019, 10, 15),
        workload: 250,
        avgWorkload: 9.3,
        dailyProgress: [],
        groups: [],
        userEmail: '1@test.com',
      },
      {
        id: 1,
        name: 'goal2',
        startDate: new Date(2019, 9, 10),
        endDate: new Date(2019, 9, 30),
        workload: 100,
        avgWorkload: 5.0,
        dailyProgress: [],
        groups: [],
        userEmail: '2@test.com',
      }
    ]
  }

  onUpdateProgress(id: number, event: Event) {
    let progressKey = String(id) + this.date.value.toLocaleDateString();
    this.newProgress.set(progressKey, {
      id: id,
      d: this.date.value,
      progress: +(<HTMLInputElement>event.target).value
    });
  }
}

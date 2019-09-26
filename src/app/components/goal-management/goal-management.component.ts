import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Goal} from 'src/app/model/goal';
import {AngularFireGoalManagementService} from 'src/app/services/af-goal-management.service';
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

  goalArr: Observable<Goal[]>;
  userEmail: string;
  // the key of the newProgress is the combination of goalId and date, the value
  // is the progress number
  newProgress: Map<{id: string, d: Date}, number>;

  constructor(
      private afGoalService: AngularFireGoalManagementService,
      private userAccountService: UserAccountService) {}

  ngOnInit() {
    this.userEmail = this.userAccountService.loggedinUser.email;
    this.goalArr = this.afGoalService.getGoals(this.userEmail);
  }

  onTempEditProgress(id: string, event: Event) {
    let changedDate: Date = this.date.value;
    this.newProgress.set(
        {id, d: changedDate}, +(<HTMLInputElement>event.target).value);
  }

  // onUpdateProgress() {
  //   this.afGoalService.updateProgress(this.newProgress);
  // }
}

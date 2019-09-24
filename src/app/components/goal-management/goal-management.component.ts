import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Goal} from 'src/app/model/goal';
import {FakeGoalManagementService} from 'src/app/services/fake-goal-management-service';

@Component({
  selector: 'app-goal-management',
  templateUrl: './goal-management.component.html',
  styleUrls: ['./goal-management.component.css']
})
export class GoalManagementComponent implements OnInit {
  date = new FormControl(new Date());
  goalSet: Goal[];
  userName: string;

  constructor(
      private goalManagementService: FakeGoalManagementService,
      private route: ActivatedRoute) {}

  ngOnInit() {
    this.userName = this.route.params['username'];
    this.goalSet = this.goalManagementService.getGoals(this.userName);
    console.log(this.goalSet)
  }
}

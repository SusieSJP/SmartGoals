import {Component, OnInit} from '@angular/core';
import {Goal} from 'src/app/model/goal';
import {GoalManagementService} from 'src/app/services/goal-management.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  panelOpenState = false;
  goalArr: Goal[];
  userEmail: string;

  constructor(private afGoalService: GoalManagementService) {}

  ngOnInit() {
    this.goalArr = this.afGoalService.currGoals;
    console.log(this.goalArr);
  }
}

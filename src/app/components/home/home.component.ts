import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  introImgUrl: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fshutterstock_1476510890.png?alt=media&token=c38031ea-a043-4bca-ad49-073d2c1f4e81';

  goalManagaementUrl: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2FnewProgress.png?alt=media&token=35e6bf37-5518-476d-9a54-de7f09322d97';
  newGoalUrl: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2FnewGoal.png?alt=media&token=92af94d0-4ad5-471c-9107-496f782e77bc';
  progress1: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fprogress0.png?alt=media&token=ede49502-be55-4bd4-8e68-3c9d693d4740';
  progress2: string =
      'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/imgAssets%2Fprogress2.png?alt=media&token=e252b7ff-c44b-41bc-92d7-aba63937e3c4';

  constructor() {}

  ngOnInit() {}
}

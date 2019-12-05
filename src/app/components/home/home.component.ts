import {Component, OnInit} from '@angular/core';
import {ImageService} from 'src/app/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  introImgUrl: string = '';
  goalManagaementUrl: string = '';
  newGoalUrl: string = '';
  progress1Url: string = '';
  progress2Url: string = '';

  constructor(private imageService: ImageService) {}

  async ngOnInit() {
    this.introImgUrl = await this.imageService.loadImg(
        'imgAssets/shutterstock_1476510890.png');
    this.goalManagaementUrl =
        await this.imageService.loadImg('imgAssets/newProgress.png');
    this.newGoalUrl = await this.imageService.loadImg('imgAssets/newGoal.png');
    this.progress1Url =
        await this.imageService.loadImg('imgAssets/progress0.png');
    this.progress2Url =
        await this.imageService.loadImg('imgAssets/progress2.png');
  }
}

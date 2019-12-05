import {Component, OnInit} from '@angular/core';
import {ImageService} from 'src/app/services/image.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  // background images
  mainpageUrl: string = '';

  constructor(private imageService: ImageService) {}

  async ngOnInit() {
    this.mainpageUrl = await this.imageService.loadImg(
        'imgAssets/shutterstock_1476518783.png');
  }
}

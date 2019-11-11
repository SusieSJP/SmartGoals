import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {
  @ViewChild('image', {static: false}) imageElement: ElementRef;
  @Input() imageSource: string;
  @Output() newPhoto = new EventEmitter();

  imageFinalUrl: string;
  private cropper: Cropper;

  constructor() {
    this.imageFinalUrl = '';
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageFinalUrl = canvas.toDataURL('image/png');
      }
    });
  }

  uploadPhoto() {
    this.newPhoto.emit(this.imageFinalUrl);
  }
}

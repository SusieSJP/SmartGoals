import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class ImageService {
  storage = firebase.storage();

  loadImg(path: string): Promise<any> {
    return this.storage.ref(path).getDownloadURL();
  }
}

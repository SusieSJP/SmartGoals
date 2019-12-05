export class User {
  constructor(
      public email: string, public userName: string,
      public defaultPhoto: boolean = true,
      public photoUrl: string =
          'https://firebasestorage.googleapis.com/v0/b/smart-goals-50b0d.appspot.com/o/profilePhotos%2Fundefined%2Fanalytics.svg?alt=media&token=81233ee9-c882-472d-a781-03759c251eef') {
  }
}

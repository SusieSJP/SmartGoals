import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('f', {static: true}) loginForm: NgForm;
  loginStatus = true;
  hide = true;
  errorMsg = '';

  constructor(public userService: UserService) {}

  async onSubmit() {
    await this.userService.loginWithEmail(
        this.loginForm.value.email, this.loginForm.value.password);
    if (this.userService.errorMessage) {
      this.errorMsg = this.userService.errorMessage;
      this.userService.errorMessage = '';
    } else {
      this.errorMsg = '';
    }
  }
}

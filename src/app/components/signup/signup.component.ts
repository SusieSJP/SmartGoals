import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  hide: boolean = true;

  constructor(private userService: UserService) {}

  onCreateAccount(form: NgForm) {
    this.userService.signUp(
        form.value.email, form.value.userName, form.value.password);
  }
}

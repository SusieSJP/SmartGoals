import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserAccountService} from 'src/app/services/user-account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public userAccountService: UserAccountService) {}

  ngOnInit() {}

  onCreateAccount(form: NgForm) {
    this.userAccountService.signUp(
        form.value.email, form.value.userName, form.value.password);
  }
}

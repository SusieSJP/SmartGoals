import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {FakeUserAccountService} from 'src/app/services/fake-user-account.service';
import {UserAccountService} from 'src/app/services/user-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f', {static: true}) loginForm: NgForm;
  loginStatus = true;

  constructor(
      private router: Router, private userAccountService: UserAccountService) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.loginForm)
    let user = this.userAccountService.login(
        this.loginForm.value.email, this.loginForm.value.password);

    if (user != null) {
      this.router.navigate(['/mainpage', user.userName]);
    } else {
      this.loginForm.reset();
      this.loginStatus = false;
    }
  }
}

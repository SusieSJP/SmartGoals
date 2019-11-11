import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {skip, take} from 'rxjs/operators';
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
      private router: Router, public userAccountService: UserAccountService) {}

  ngOnInit() {
    this.userAccountService.activeUser.pipe(skip(1), take(1))
        .subscribe((user) => {
          if (user != null) {
            this.router.navigate(['/mainpage', user.userName]);
          } else {
            this.loginForm.reset();
            this.loginStatus = false;
          }
        });
  }

  onSubmit() {
    this.userAccountService.loginWithEmail(
        this.loginForm.value.email, this.loginForm.value.password);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <h3>Login Form</h3>

 <div>
  <form #loginForm="ngForm" (ngSubmit)="onFormSubmit(loginForm)">
  <div class="flex">

    <div class="form-group">
      <label for="username">Username</label>
      <input type='text' placeholder="username..."  name='username' ngModel>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password"  placeholder="password..." name="password" ngModel>
    </div>
    <div class="form-group">
      <button class="btn" type="submit">Submit</button>
      </div>
  </div>
  </form>
 </div>
  `,
  styleUrls: ['../form.css']
})

export class LoginComponent implements OnInit {
  invalidCredMsg: string;
  username: string;
  password: string;
  redirect = "songs";

  authSubscription: Subscription;

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.redirect = params.get('redirect') || 'songs';
    });
    this.authSubscription = this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          console.log('logged in, LoginComponent/ngOnInit ' + this.redirect);
          this.router.navigate([this.redirect]);
        }
      }
    );
  }

  onFormSubmit(loginForm: NgForm) {
    this.userService.login(loginForm.value.username, loginForm.value.password);
    /*
    .subscribe(data => {
      console.log('return to ' + this.retUrl);
      if (this.retUrl != null) {
        this.router.navigate([this.retUrl]);
      } else {
        this.router.navigate(['home']);
      }
    });
    */
  }

}

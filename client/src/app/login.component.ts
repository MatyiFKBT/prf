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
    <p>username: <input type='text'  name='username' ngModel></p>
    <p>password: <input type="password"  name="password" ngModel></p>
    <p><button type="submit">Submit</button></p>
  </form>
 </div>
  `,
  styles: [
  ]
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
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
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

  // todo redirect to retUrl if auth successful /get/me


}

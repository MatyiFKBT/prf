import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <h3>Login Form</h3>

 <div>
  <form #loginForm="ngForm" (ngSubmit)="onFormSubmit(loginForm)">
    <p>User Name: <input type='text'  name='username' ngModel></p>
    <p>Password: <input type="password"  name="password" ngModel></p>
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
  redirect: string = "songs";

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.redirect = params.get('retUrl') as string;
        console.log('LoginComponent/ngOnInit ' + this.redirect);
      });
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <h3>Register Form</h3>

    <div>
  <form #registerForm="ngForm" (ngSubmit)="onFormSubmit(registerForm)">
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
export class RegisterComponent implements OnInit {
  invalidCredMsg: string;

  username: string;
  password: string;
  retUrl = "songs";

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.retUrl = params.get('retUrl') as string;
      });
  }
  onFormSubmit(loginForm: NgForm) {
    this.userService.register(loginForm.value.username, loginForm.value.password);
  }

}

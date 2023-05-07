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
   <p>username: <input type='text'  name='username' ngModel></p>
   <p>password: <input type="password"  name="password" ngModel></p>
   <p><button>Register</button></p>
 </form>
</div>
  `,
  styles: [
  ]
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
        console.log('LoginComponent/ngOnInit ' + this.retUrl);
      });
  }
  onFormSubmit(loginForm: NgForm) {
    this.userService.register(loginForm.value.username, loginForm.value.password);
  }

}

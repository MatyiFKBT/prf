import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checking-auth-component',
  template: `
      <h2>Please wait...</h2>
    <p>
      Checking authentication status...
    </p>
  `,
  styles: [
  ]
})
export class CheckingAuthComponent implements OnInit {

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
        } else {
          console.log('not logged in, LoginComponent/ngOnInit ' + this.redirect);
          this.router.navigate(['login', {
            redirect: this.redirect
          }]);
        }
      }
    );
  }

}

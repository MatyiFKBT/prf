import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-nav',
  template: `
  <nav>
    <div class="nav-left">
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/songs">Songs</a></li>
        <li *ngIf="isLoggedin"><a routerLink="/songs/new">New song</a></li>
      </ul>
    </div>
    <div class="nav-right">
      <ul *ngIf="isLoggedin; else loggedOut">
      <p>Logged in as {{user?.username}}</p>
      <li>
        <a routerLink="/me">My songs</a>
      </li>
      <li>
        <a (click)="logout()">Logout</a>
      </li>
    </ul>
    <ng-template #loggedOut>

    <ul>
      <li>
        <a routerLink="/login">Login</a>
      </li>
      <li>
        <a routerLink="/register">Register</a>
      </li>
    </ul>
    </ng-template>
    </div>
  </nav>

  `,
  styles: [
    `
    nav {
      background-color: #333;
      overflow: hidden;
      color: white;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    li {
      float: left;
    }
    li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }
    li a:hover {
      background-color: #111;
    }
    .nav-right {
      float: right;
    }
    `
  ]
})
export class NavComponent implements OnInit {
  constructor(public userService: UserService,
    private router: Router) {
  }
  isLoggedin = false;
  user: User | null = null;
  loginSubscription: Subscription;
  userSubscription: Subscription;
  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.loginSubscription = this.userService.isLoggedIn.subscribe(
      (value) => this.isLoggedin = value
    )
    this.userSubscription = this.userService.getUserData.subscribe(
      (value) => this.user = value
    )
  }
}

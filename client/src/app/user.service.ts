import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getUserData: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {
    console.log('user.service.ts: constructor()');
    this.http.get<AuthResponse>('/api/users/me').subscribe((response) => {
      this.isLoggedIn.next(true);
      this.getUserData.next(response.user!);
    }, () => {
      this.isLoggedIn.next(false);
      this.getUserData.next(null);
    });
  }

  login(username: string, password: string) {
    this.http.post<AuthResponse>('/api/users/login', { username, password }).subscribe((response) => {
      if (response.message == "Login successful") {
        this.isLoggedIn.next(true);
        this.getUserData.next(response.user!);
        // this.router.navigate(['songs']);
      }
    });
    // console.log('user.service.ts: login()', response);
    // return response;
  }
  async logout() {
    this.http.post<AuthResponse>('/api/users/logout', {}).subscribe((response) => {
      if (response.message == "Logout successful") {
        this.isLoggedIn.next(false);
        this.getUserData.next(null);
        this.router.navigate(['login']);
      }
    });
  }
  async register(username: string, password: string) {
    this.http.post<AuthResponse>('/api/users/register', { username, password }).subscribe((response) => {
      if (response.message == "Register successful") {
        this.isLoggedIn.next(true);
        this.getUserData.next(response.user!);
        this.router.navigate(['songs']);
      }
    });
  }
}

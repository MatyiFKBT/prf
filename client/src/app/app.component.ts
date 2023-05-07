import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `

 <app-nav> </app-nav>
 <main>
   <router-outlet></router-outlet>
  </main>
  `,
  styles: [`
  h1 { color: red }
  `]
})
export class AppComponent {
  title = 'Habit Tracker';

  constructor(private userService: UserService,
    private router: Router) {
  }

}

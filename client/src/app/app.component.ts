import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `

 <app-nav> </app-nav>
<router-outlet></router-outlet>
  `,
  styles: [`
  h1 { color: purple }
  `]
})
export class AppComponent {
  title = 'Habit Tracker';

  constructor(private userService: UserService,
    private router: Router) {
  }

}

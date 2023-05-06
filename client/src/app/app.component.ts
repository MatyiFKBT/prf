import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

  <nav>
    <ul>
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="/songs">Songs</a></li>
    </ul>
  </nav>
<router-outlet></router-outlet>
  `,
  styles: [`
  main {
    margin: 20px;
  }
  h1 { color: purple }
  `]
})
export class AppComponent {
  title = 'Habit Tracker';
}

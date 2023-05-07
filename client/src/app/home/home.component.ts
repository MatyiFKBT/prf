import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <main>

    <h1>Home</h1>
    <p> Welcome to the Song-Lister App! </p>

    <p>
      To get started, please <a routerLink="/register">register</a> or <a routerLink="/login">login</a>.
    </p>
    <p>Once you are logged in, you can add songs to the global list and express your opinion about them.</p>

    <h2>Main features:</h2>
    <ul>
      <li>
        <strong>Register</strong> - create a new account
      </li>
      <li>
        <strong>Login</strong> - log in to your account
      </li>
      <li>
        <strong>List view (feed)</strong> - view all entries in the global list
      </li>
      <li>
        <strong>My songs</strong> - view all entries in your personal list
      </li>
      <li>
        <strong>Add song</strong> - add a new song to the global list
      </li>
      <li>
        <strong>Delete entry</strong> - delete an entry from your list
      </li>
      <li>
        <strong>Links</strong> - you can click on the provided links to view the song on YouTube or the artist on Wikipedia, whatever the submitter provided
      </li>
      </ul>

    <h2>Technologies used:</h2>
    <ul>
      <li>
        <strong>Angular</strong> - frontend framework
      </li>
      <li> <strong>Express</strong> - backend framework </li>
      <li> <strong>Node.js</strong> - JavaScript runtime environment </li>
      <li> <strong>MongoDB</strong> - database </li>
      <li> <strong>@angular/material</strong> - UI component library </li>
      <li><strong> TypeScript</strong> - programming language </li>
      <li><strong>HTML</strong> - markup language </li>
      <li><strong>CSS</strong> - styling </li>
    </ul>

    <small>
      The source code is available on <a href="https://github.com/matyifkbt/prf/">GitHub</a>.
    </small>

  </main>
  `,
  styles: [
    'h1 { color: red; }'
  ]
})
export class HomeComponent {

}

import { Component, Input } from '@angular/core';
import { Song } from '../song';

@Component({
  selector: 'app-song-item',
  template: `
    <li>
      <a [routerLink]="['/songs', song._id]">
        {{ song.user.username }} - {{ song.title }}
      </a>
    </li>
  `,
  styles: [
  ]
})
export class SongItemComponent {
  @Input() song: Song;

}

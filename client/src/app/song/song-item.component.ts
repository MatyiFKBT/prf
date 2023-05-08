import { Component, Input } from '@angular/core';
import { Song } from '../song';

@Component({
  selector: 'app-song-item',
  template: `
      {{ song.user.username }} -
      <a [routerLink]="['/songs', song._id]">
        {{ song.title }}
      </a>
  `,
  styles: [
  ]
})
export class SongItemComponent {
  @Input() song: Song;

}

import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-my-songs',
  template: `
    <h2>My Songs</h2>
    <ul>
      <li class="flex" *ngFor="let song of songs | async">
        <app-song-item [song]="song"></app-song-item>
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class MySongsComponent implements OnInit {
  songs: Observable<Song[]>;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songs = this.songService.refetch.pipe(
      switchMap(() => this.songService.getMySongs())
    )
  }
}

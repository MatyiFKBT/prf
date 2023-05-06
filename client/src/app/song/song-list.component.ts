import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-list',
  template: `
    <h2>Song List</h2>
    <app-song-form (addSong)="onAddSong($event)"></app-song-form>
    <ul>
      <app-song-item
        *ngFor="let song of songs | async"
        [song]="song"
      ></app-song-item>
    </ul>
  `,
  styles: [
  ]
})
export class SongListComponent implements OnInit {
  songs: Observable<Song[]>;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songs = this.songService.refetch.pipe(
      switchMap(() => this.songService.getSongs())
    )
  }

  onAddSong(song: Song) {
    this.songService.addSong(song).subscribe();
  }
}

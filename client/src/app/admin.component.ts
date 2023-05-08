import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Song } from './song';
import { SongService } from './song.service';

@Component({
  selector: 'app-admin',
  template: `
   <h2>Admin page</h2>

   <p>
      Here you can see all the songs in the database and delete them.
   </p>

    <ul>
      <li class="flex" *ngFor="let song of songs | async">
        <app-song-item [song]="song"></app-song-item>
        <button class="btn" style="margin-left:0.2rem;" (click)="deleteSong(song._id)">Delete</button>
      </li>
    </ul>

  `,
  styles: [
  ]
})
export class AdminComponent implements OnInit {
  songs: Observable<Song[]>;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songs = this.songService.refetch.pipe(
      switchMap(() => this.songService.getSongs())
    )
  }
  deleteSong(id: string) {
    this.songService.deleteSong(id).subscribe();
  }
}

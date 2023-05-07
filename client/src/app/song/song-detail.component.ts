import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Song } from '../song';
import { SongService } from '../song.service';
@Component({
  selector: 'app-song-detail',
  template: `
    <h2>Song Detail</h2>
    <p> Song id: {{id}}</p>
    <!-- display the fetched son -->
    <div *ngIf="song | async as song; else loading">
      <p> {{song.user.username}} - {{song.title}}</p>
      <button (click)="songService.likeSong(song._id).subscribe()">Like
        <span *ngIf="song.likes > 0">({{song.likes}})</span>
      </button>
      <button (click)="songService.deleteSong(song._id).subscribe()">Delete</button>
    </div>
    <ng-template #loading> Loading song...</ng-template>
  `,
  styles: [
  ]
})
export class SongDetailComponent implements OnInit {
  id: string;
  song: Observable<Song>;
  songSubscription: Subscription;
  constructor(private route: ActivatedRoute, public songService: SongService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
    });
    this.song = this.songService.getSong(this.id);
    this.songSubscription = this.songService.refetch.subscribe(() => {
      this.song = this.songService.getSong(this.id);
    });
  }
}

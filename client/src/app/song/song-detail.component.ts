import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../song';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { SongService } from '../song.service';
@Component({
  selector: 'app-song-detail',
  template: `
    <h2>Song Detail</h2>
    <p> Song id: {{id}}</p>
    <!-- display the fetched son -->
    <div *ngIf="song | async as song; else loading">
      <p> {{song.user.username}} - {{song.title}}</p>
    </div>
    <ng-template #loading> Loading song...</ng-template>
  `,
  styles: [
  ]
})
export class SongDetailComponent implements OnInit {
  id: string;
  song: Observable<Song>;
  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
    });
    this.song = this.songService.getSong(this.id);
  }
}

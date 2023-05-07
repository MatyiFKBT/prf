import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-form',
  template: `
  <h2>Add a new song</h2>
    <form [formGroup]="songForm" (ngSubmit)="onSubmit(songForm.value)">
      <input type="text" placeholder="Title..." formControlName="title" />
      <input type="text" placeholder="Artist..." formControlName="artist" />
      <input type="url" placeholder="Link..." formControlName="link" />

      <button type="submit">Add</button>
    </form>
  `,
  styles: [
    `
      input {
        width: 200px;
        height: 30px;
        margin: 5px;
      }

    `
  ]
})
export class SongFormComponent {
  songForm: any;

  @Output() addSong = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
    private songService: SongService) {

    this.songForm = this.formBuilder.group({
      title: '',
      artist: '',
      link: ''
    });
  }

  onSubmit(song: Song) {
    this.songService.addSong(song).subscribe();
    this.songForm.reset();
  }
}

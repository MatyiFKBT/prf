import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Song } from '../song';

@Component({
  selector: 'app-song-form',
  template: `
    <form [formGroup]="songForm" (ngSubmit)="onSubmit(songForm.value)">
      <input type="text" placeholder="Title..." formControlName="title" />
      <input type="text" placeholder="Artist..." formControlName="artist" />
      <input type="text" placeholder="Link..." formControlName="link" />
      <button type="submit">Add</button>
    </form>
  `,
  styles: [
  ]
})
export class SongFormComponent {
  songForm: any;

  @Output() addSong = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) {
    this.songForm = this.formBuilder.group({
      title: '',
      artist: '',
      link: ''
    });
  }

  onSubmit(song: any) {
    this.addSong.emit(song);
    this.songForm.reset();
  }
}

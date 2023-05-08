import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SongService } from 'src/app/song.service';

@Component({
  selector: 'app-comment-form',
  template: `
    <h3> Add a comment </h3>
    <form [formGroup]="commentForm" (ngSubmit)="onSubmit(commentForm.value)">
      <input type="text" placeholder="Comment..." formControlName="text" />
      <button class="btn" style="margin-left: 0.5rem;" type="submit">Add</button>
    </form>

  `,
  styles: [`

  ` ]
})
export class CommentFormComponent {
  commentForm;
  @Input() songId: string;
  @Output() addComment = new EventEmitter<Comment>();
  constructor(private formBuilder: FormBuilder, private songService: SongService) {
    this.commentForm = this.formBuilder.group({
      text: ''
    });
  }
  onSubmit(comment: { text?: string | null }) {
    console.log('comment-form.component.ts: onSubmit()', { comment });
    if(comment.text === null || comment.text === undefined || comment.text === '') {
      return;
    }
    this.songService.addComment(this.songId, comment.text).subscribe();
    this.commentForm.reset();
  }



}

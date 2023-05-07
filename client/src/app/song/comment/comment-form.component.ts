import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  template: `
    <p>
      comment-form works!
    </p>
  `,
  styles: [
  ]
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
  onSubmit(comment: Comment) {
    this.songService.addComment(this.songId, comment).subscribe(); // todo create this method
    this.commentForm.reset();
  }



}

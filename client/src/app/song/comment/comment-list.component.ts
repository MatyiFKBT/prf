import { Component, Input } from '@angular/core';
import { Comment } from '../../comment';

@Component({
  selector: 'app-comment-list',
  template: `
    <ul>
      <app-comment-item
        *ngFor="let comment of comments"
        [comment]="comment"
      ></app-comment-item>
    </ul>
  `,
  styles: [
  ]
})
export class CommentListComponent {
  @Input() comments: Comment[];

}

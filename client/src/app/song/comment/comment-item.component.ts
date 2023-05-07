import { Component, Input } from '@angular/core';
import { Comment } from '../../comment';

@Component({
  selector: 'app-comment-item',
  template: `
    <li>
      <b>{{ comment.user.username }}</b> - {{ comment.text }}
    </li>
  `,
  styles: [
  ]
})
export class CommentItemComponent {
  @Input() comment: Comment;
}

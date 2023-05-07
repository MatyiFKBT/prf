import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  template: `
    <li>
      <b>{{ comment.user.username }}</b> - {{ comment.content }}
    </li>
  `,
  styles: [
  ]
})
export class CommentItemComponent {
  @Input() comment: Comment;
}

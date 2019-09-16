import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() user: User;
  @Input() comments: Comment[];
  @Output() commentSender = new EventEmitter<Comment>();
  public comment: Comment;

  constructor(private commentService: CommentService, private auth: AuthService) {
    this.comment = new Comment();
   }

  ngOnInit() {
    if(this.user){
      this.comment.user_id = this.user._id
      this.comment.user_name = this.user.name
      this.comment.profile_img = this.user.profile_img
    }
  }

  sendComment() {
    this.commentSender.emit(this.comment)
    this.comment.text = ''
  }

  checkLogin() {
    return !!this.auth.getToken()
  }

}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Comment } from '../models/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() { 
    this.socket = io(this.url);
  }

  sendComment(company_id: string, comment: Comment) {
    this.socket.emit('sendComment', {
      company_id,
      comment
    });
  }

  getComment() {
    return Observable.create((observer) => {
        this.socket.on('sendOutComment', (comment) => {
            observer.next(comment);
        });
    });
  }
}

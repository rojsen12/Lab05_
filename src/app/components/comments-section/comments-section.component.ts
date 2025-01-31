import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'comments-section',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css'],
})
export class CommentsSectionComponent implements OnInit {
  @Input() postId!: string; 
  newComment: string = '';  
  newNick: string = ''; 
  comments: { text: string, nick: string }[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.comments = this.commentsService.getComments(this.postId);
    console.log(this.postId);
  }

  addComment(): void {
    if (this.newComment.trim() && this.newNick.trim()) {
      const comment = {
        text: this.newComment,
        nick: this.newNick
      };

      this.commentsService.addComment(this.postId, comment);

      this.newComment = '';
      this.newNick = '';
      
      this.comments = this.commentsService.getComments(this.postId); 
      console.log(this.postId);
    }
  }
}

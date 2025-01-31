import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  newPost = {
    title: '',
    text: '',
    image: ''
  };

  constructor(private dataService: DataService) { }

  onSubmit(): void {
    if (this.newPost.title.trim() && this.newPost.text.trim() && this.newPost.image.trim()) {
      
      this.dataService.addPost(this.newPost).subscribe(
        (response) => {
          console.log('Post added successfully:', response);
          this.newPost = { title: '', text: '', image: '' };
        },
        (error) => {
          console.error('Error adding post:', error);
        }
      );
    }
  }
}

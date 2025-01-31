import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { FormsModule } from '@angular/forms';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogHomeComponent, BlogComponent, CommentsSectionComponent, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
 })
 
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public counter: number = 0;

  add() {
    this.counter++;
  }
 
  remove() {
    this.counter--;
  }
 }
 

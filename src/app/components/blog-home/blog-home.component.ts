import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { BlogComponent } from '../blog/blog.component';
import { forwardRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [
    SearchBarComponent, 
    forwardRef(() => BlogComponent),
    CommonModule 
  ],
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  public filterText: string = '';
  showScrollButton: boolean = false; 
  @ViewChild(BlogComponent) blogComponent!: BlogComponent;

  constructor() {}

  ngOnInit(): void {}

  getName($event: string): void {
    this.filterText = $event;
  }

  refreshPosts(): void {
    if (this.blogComponent) {
      this.blogComponent.getAll(); 
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollButton = window.scrollY > 300;  
  }
}

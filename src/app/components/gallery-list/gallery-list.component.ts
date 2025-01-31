import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-gallery-list',
  standalone: true,
  imports: [CommonModule, GalleryComponent], 
  templateUrl: './gallery-list.component.html',
  styleUrl: './gallery-list.component.css'
})
export class GalleryListComponent implements OnInit {
  posts: any = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.posts = this.dataService.getAll();
}
}

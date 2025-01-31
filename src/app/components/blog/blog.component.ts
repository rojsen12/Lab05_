import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { GalleryListComponent } from '../gallery-list/gallery-list.component';
import {HttpClientModule} from "@angular/common/http";
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { Observable, of } from 'rxjs';
import { BlogHomeComponent } from '../blog-home/blog-home.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, CommentsSectionComponent, AddPostComponent, GalleryComponent, GalleryListComponent, HttpClientModule, FilterTextPipe, SearchBarComponent, BlogHomeComponent],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
 })
 
 export class BlogComponent implements OnInit {

  @Input() filterText: string = '';
 
  public items$: Observable<any> = of([]);
  public isListEmpty: boolean = false;
 
  constructor(private service: DataService) {
  }
  ngOnInit() {
    console.log('Filter text:', this.filterText);
    this.getAll();
  }
 
  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = of(response);
    });
  }
 }
 
 
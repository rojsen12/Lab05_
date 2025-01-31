import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3100';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(this.url + '/api/post');
  }

  public addPost(post: { title: string, text: string, image: string }): Observable<any> {
    const newPost = {
      title: post.title,
      text: post.text,
      image: post.image
    };

    return this.http.post(this.url + '/api/post', newPost);
  }

  getById(id: string) {
    return this.http.get<any>(this.url + '/api/post/' + id);
  }
}
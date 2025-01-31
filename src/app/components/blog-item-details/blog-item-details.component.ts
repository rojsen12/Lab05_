import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../../services/data.service";
import { HttpClientModule } from "@angular/common/http";

interface Post {
 title: string;
  text: string;
  image: string;
  }

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrls: ['./blog-item-details.component.css']
})
export class BlogItemDetailsComponent implements OnInit {
  public post!: any;

  constructor(private service: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    let id: string = '';
    this.route.paramMap.subscribe((params: any) => {
      id = params.get('id');
    });

    this.service.getById(id).subscribe((res: Post[]) => {
      this.post = res[0];
    });
  }
}
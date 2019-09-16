import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input() news: News[];
  public newsWindow: News;

  constructor() {
    this.newsWindow = new News();
   }

  ngOnInit() {
  }

  openNews(news: News) {
    this.newsWindow = news
  }

}

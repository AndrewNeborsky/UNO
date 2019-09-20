import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input() news: News[];
  public newsWindow: News;

  fromSearch: NgbDate;
  toSearch: NgbDate;

  constructor() {
    this.newsWindow = new News();
   }

  ngOnInit() {
  }

  openNews(news: News) {
    this.newsWindow = news
  }

}

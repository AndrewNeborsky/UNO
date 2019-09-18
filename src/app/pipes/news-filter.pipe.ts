import { Pipe, PipeTransform } from '@angular/core';
import { News } from '../models/news.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'newsFilter'
})
export class NewsFilterPipe implements PipeTransform {

  transform(news: News[], fromSearch?: NgbDate, toSearch?: NgbDate): any {
    if(fromSearch) {
      let date = new Date(fromSearch.year, fromSearch.month - 1, fromSearch.day)
      news = news.filter((el: News) => {
        el.create_date = new Date(el.create_date)
        return el.create_date >= date
      })
    }
    if(toSearch) {
      let date = new Date(toSearch.year, toSearch.month - 1, toSearch.day)
      news = news.filter((el: News) => {
        el.create_date = new Date(el.create_date)
        return el.create_date <= date
      })
    }
    return news
  }

}

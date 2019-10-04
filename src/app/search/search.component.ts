import { Component, OnInit, ElementRef } from '@angular/core';
import { Company } from '../models/company.model';
import { fromEvent, from } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Config from '../config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  
  public companies: Company[];

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const searchEl: HTMLElement = this.element.nativeElement;
    let search = searchEl.getElementsByClassName('searchCompanies')[0];
    const searcher = fromEvent(search, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(e => ajax(Config.host + '/api/company/search/' + e))
    );

    searcher.subscribe(data => {
      this.companies = data.response;
    });
  }
}

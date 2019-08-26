import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events = []

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.testService.getEvents().subscribe(
        res => this.events = res['events'],
        err => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      )
  }

}

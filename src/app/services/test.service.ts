import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  private url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get(this.url + '/home')
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getUser(id: String) {
    return this.http.post(this.url + '/profile', {id})
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getUser(id: String) {
    return this.http.get<User>(this.url + '/profile/' + id)
  }
  changeProfile(user: User) {
    return this.http.post<User>(this.url + '/profile/change', user)
  }
}

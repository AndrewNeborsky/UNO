import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api/auth'

  constructor(private http: HttpClient) { }

  register (user: User) {
    return this.http.post(this.url + '/register', user)
  }

  login (user: User) {
    return this.http.post(this.url + '/login', user)
  }

  socialLogin (id: Number) {
    return this.http.post(this.url + '/socialLogin', {id})
  }

  logout () {
    localStorage.removeItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getThisUser() {
    return this.http.get<User>(this.url + '/user')
  }
}

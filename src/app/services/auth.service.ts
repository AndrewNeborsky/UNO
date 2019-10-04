import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import Config from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private url = Config.host + '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User) {
    return this.http.post(this.url + '/register', user);
  }

  login(user: User) {
    return this.http.post(this.url + '/login', user);
  }

  socialLogin(id: Number) {
    return this.http.post(this.url + '/socialLogin', { id });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getThisUser() {
    return this.http.get<User>(this.url + '/user');
  }
}

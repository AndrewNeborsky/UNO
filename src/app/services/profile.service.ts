import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { PayHistory } from '../models/payHistory.model';
import Config from '../config';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = Config.host + '/api/profile/'

  constructor(private http: HttpClient) { }

  getUser(id: String) {
    return this.http.get<User>(this.url + id)
  }
  changeProfile(user: User) {
    return this.http.post<User>(this.url + 'change', user)
  }
  addPayHistory(user_id: string, pay_history: PayHistory) {
    return this.http.post(this.url + 'pay_history/add', {user_id, pay_history})
  }
  deletePayHistory (user_id: string, pay_history_list: string[]) {
    return this.http.post(this.url + 'pay_history/delete', {user_id, pay_history_list})
  }
  getUsers(){
    return this.http.get<User[]>(this.url + 'get_all')
  }
  deleteUser(id: string) {
    return this.http.post(this.url + 'delete', {id})
  }
  blockUser(id: string) {
    return this.http.post(this.url + 'block', {id})
  }
  unlockUser(id: string) {
    return this.http.post(this.url + 'unlock', {id})
  }
  toggleAccessUser(id: string) {
    return this.http.post(this.url + 'toggle_access', {id})
  }
}

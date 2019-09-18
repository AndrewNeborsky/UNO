import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile.service';
import { CompanyService } from '../services/company.service';
import { Sort } from '@angular/material/sort';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public thisUser: User;

  private users: User[];
  sortedUsers: User[];

  trackByUsers(index: number, user: User): number {
    return +user._id
  }

  constructor(private profileService: ProfileService, private companyService: CompanyService,
    private auth: AuthService, private router: Router, private infoService: InfoService) { }

  ngOnInit() {
    this.auth.getThisUser().subscribe(res => {
      this.thisUser = res
    })
    this.profileService.getUsers().subscribe(res => {
      this.users = res
      this.sortedUsers = this.users.slice();
    }, 
    err => {
      if (err['status'] === 403) {
        this.infoService.showAlert('You do not have access to perform this action')
        this.router.navigate(['/home'])
      }
    })
  }

  sortUsers(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedUsers = data;
      return;
    }

    this.sortedUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'access': return compare(a.access, b.access, isAsc);
        case 'provider': return compare(a.provider, b.provider, isAsc);
        case 'isBlock': return compare(a.isBlock, b.isBlock, isAsc);
        default: return 0;
      }
    });
  }

  findCheckedElements(id: string) {
    var els = [], isMe = false;
    $.each($('.check:checked'), function(index, el){
      els.unshift(el.value);
      if (el.value == id) isMe = true;
    })
    return [els, isMe]
  }

  deleteUsers() {
    let row = this.findCheckedElements(this.thisUser._id), els, isMe;
    els = row[0], isMe = row[1]
    for (let i = 0; i < els.length; i++) {
      this.profileService.deleteUser(els[i]).subscribe(res => {
        let index = this.users.findIndex(x => x._id == els[i])
        if(~index) {
          this.users.splice(index, 1)
          this.sortedUsers = this.users.slice();
        }
      })
      this.companyService.deleteUserCompanies(els[i]).subscribe()
    }
    if (isMe) this.auth.logout()
  }

  blockUsers() {
    let row = this.findCheckedElements(this.thisUser._id), els, isMe;
    els = row[0], isMe = row[1]
    for (let i = 0; i < els.length; i++) {
      this.profileService.blockUser(els[i]).subscribe(res => {
        let index = this.users.findIndex(x => x._id == els[i])
        if(~index) {
          this.users[index].isBlock = true
          this.sortedUsers = this.users.slice();
        }
      })
    }
    if (isMe) this.auth.logout()
  }

  unlockUsers() {
    let row = this.findCheckedElements(this.thisUser._id), els, isMe;
    els = row[0], isMe = row[1]
    for (let i = 0; i < els.length; i++) {
      this.profileService.unlockUser(els[i]).subscribe(res => {
        let index = this.users.findIndex(x => x._id == els[i])
        if(~index) {
          this.users[index].isBlock = false
          this.sortedUsers = this.users.slice();
        }
      })
    }
    if (isMe) this.auth.logout()
  }

  toggleAccessUsers() {
    let row = this.findCheckedElements(this.thisUser._id), els, isMe;
    els = row[0], isMe = row[1]
    for (let i = 0; i < els.length; i++) {
      this.profileService.toggleAccessUser(els[i]).subscribe(res => {
        let index = this.users.findIndex(x => x._id == els[i])
        if(~index) {
          this.users[index].access = this.users[index].access === 'user'?'admin':'user'
          this.sortedUsers = this.users.slice();
        }
      })
    }
    if (isMe) this.router.navigate(['/home'])
  }
}

function compare(a: number | string | Date | boolean, b: number | string | Date | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

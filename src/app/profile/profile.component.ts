import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Company } from '../models/company.model';
import { Sort } from '@angular/material/sort';
import { CompanyService } from '../services/company.service';
import { AuthService } from '../services/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PayHistory } from '../models/payHistory.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public id: string;
  public user: User;
  public thisUser: User;
  public background: SafeStyle;

  public companies: Company[];
  sortedCompany: Company[];
  sortedHistory: PayHistory[];
  checkedCompany: boolean;
  checkedHistory: boolean;
  nameSearch: string;
  minGoalSearch: number;
  maxGoalSearch: number;
  minPresentlySearch: number;
  maxPresentlySearch: number;
  minExpDateSearch: NgbDate;
  maxExpDateSearch: NgbDate;
  bonuceNameSearch: string;

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService, 
    private sanitizer: DomSanitizer, private router: Router, private companyService: CompanyService, 
    private auth: AuthService) {
    this.user = new User()
    this.thisUser = new User()
    this.id = this.activatedRoute.snapshot.params.id
   }

  ngOnInit() {
    this.profileService.getUser(this.id).subscribe(res => {
      this.user = res
      this.background = this.sanitizer.bypassSecurityTrustStyle(
        `url(${this.user.background?this.user.background:'https://demos.creative-tim.com/paper-kit-2-pro/assets/img/sections/fabio-mangione.jpg'})`);
      
      this.sortHistory({active: 'pay_date', direction: 'desc'})
    })
    this.companyService.getUserCompanies(this.id).subscribe(res => {
      this.companies = res
      this.sortedCompany = this.companies.slice();
    })
    this.auth.getThisUser().subscribe(res => {
      this.thisUser = res;
    })
  }

  sortCompany(sort: Sort) {
    const data = this.companies.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCompany = data;
      return;
    }

    this.sortedCompany = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'goal': return compare(a.goal, b.goal, isAsc);
        case 'presently': return compare(a.presently, b.presently, isAsc);
        case 'expiration_date': return compare(a.expiration_date, b.expiration_date, isAsc);
        default: return 0;
      }
    });
  }

  sortHistory(sort: Sort) {
    const data = this.user.pay_history.slice();
    if (!sort.active || sort.direction === '') {
      sort = {active: 'pay_date', direction: 'desc'};
      return;
    }

    this.sortedHistory = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'bonuce_name': return compare(a.bonuce_name, b.bonuce_name, isAsc);
        case 'amount': return compare(a.amount, b.amount, isAsc);
        case 'pay_date': return compare(a.pay_date, b.pay_date, isAsc);
        default: return 0;
      }
    });
  }

  checkAccess(){
    return !!this.auth.getToken() && (this.user._id === this.thisUser._id || this.thisUser.access === 'admin');
  }

  findCheckedElements() {
    var els = []
    $.each($('.check:checked'), function(index, el){
      els.unshift(el.value);
    })
    return els
  }

  deleteCompanies() {
    let els: string[] = this.findCheckedElements()
    for (let i = 0; i < els.length; i++) {
      this.companyService.deleteCompany(els[i]).subscribe(res => {
        let index = this.companies.findIndex(x => x._id == els[i])
        if(~index) {
          this.companies.splice(index, 1)
          this.sortedCompany = this.companies.slice();
        }
      })
    }
  }

  deleteHistory() {
    let els: string[] = this.findCheckedElements()
      this.profileService.deletePayHistory(this.user._id, els).subscribe(res => {
        for (let i = 0; i < els.length; i++) {
          let index = this.user.pay_history.findIndex(x => x._id == els[i])
          if(~index) {
            this.user.pay_history.splice(index, 1)
            this.sortHistory({active: 'pay_date', direction: 'desc'})
          }
        }
      })
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

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
  sortedCompany: Company[];

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService, 
    private sanitizer: DomSanitizer, private router: Router, private companyService: CompanyService, 
    private auth: AuthService) {
    this.user = new User()
    this.id = this.activatedRoute.snapshot.params.id
   }

  ngOnInit() {
    this.profileService.getUser(this.id).subscribe(res => {
      this.user = res
      this.background = this.sanitizer.bypassSecurityTrustStyle(
        `url(${this.user.background?this.user.background:'https://demos.creative-tim.com/paper-kit-2-pro/assets/img/sections/fabio-mangione.jpg'})`);
    })
    this.auth.getThisUser().subscribe(res => {
      this.thisUser = res;
    })
  }

  checkAccess(){
    return !!this.auth.getToken() && (this.user._id === this.thisUser._id || this.thisUser.access === 'admin');
  }
}

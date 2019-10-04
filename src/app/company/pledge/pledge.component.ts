import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Bonuce } from 'src/app/models/bonuce.model';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { PayHistory } from 'src/app/models/payHistory.model';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-pledge',
  templateUrl: './pledge.component.html',
  styleUrls: ['./pledge.component.css'],
})
export class PledgeComponent implements OnInit {
  
  public bonuces: [Bonuce];
  public background: SafeStyle;
  public company_id: string;
  public thisUserId: string;
  public pay_history: PayHistory;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private infoService: InfoService,
    private auth: AuthService,
    private profileService: ProfileService
  ) {
    this.company_id = this.activatedRoute.snapshot.params.company_id;
    this.pay_history = new PayHistory();
  }

  ngOnInit() {
    this.companyService.getBonuces(this.company_id).subscribe(res => {
      this.bonuces = res['bonuces'];
      this.background = this.sanitizer.bypassSecurityTrustStyle(
        `url(${
          res['background'] ? res['background'] : 'http://www.京大博士deの先生と勉強ネ.jp/assets/img/daniel-olahh.jpg'
        })`
      );
    });
    this.auth.getThisUser().subscribe(res => {
      this.thisUserId = res._id;
    });
  }

  setSupport(amount: HTMLInputElement) {
    if (+amount.value < +amount.min) {
      this.infoService.showAlert(`Amount must be more then ${amount.min} C.U.`);
      return false;
    }
    this.pay_history.company_id = this.company_id;
    this.pay_history.bonuce_name = amount.name;
    this.pay_history.amount = +amount.value;
    this.pay_history.pay_date = new Date();
    this.profileService.addPayHistory(this.thisUserId, this.pay_history).subscribe();
    this.companyService.setSupport(this.company_id, amount.value).subscribe(res => {
      this.router.navigate(['/company', this.company_id]);
    });
  }
}

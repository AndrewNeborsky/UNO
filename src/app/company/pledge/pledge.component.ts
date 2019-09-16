import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Bonuce } from 'src/app/models/bonuce.model';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pledge',
  templateUrl: './pledge.component.html',
  styleUrls: ['./pledge.component.css']
})
export class PledgeComponent implements OnInit {

  public bonuces: [Bonuce];
  public background: SafeStyle;
  public company_id: string;

  constructor(private activatedRoute: ActivatedRoute, private companyService: CompanyService, 
    private sanitizer: DomSanitizer, private router: Router, private toastr: ToastrService) { 
    this.company_id = this.activatedRoute.snapshot.params.company_id
  }

  ngOnInit() {
    this.companyService.getBonuces(this.company_id).subscribe(res => {
      this.bonuces = res['bonuces']
      this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${res['background']?res['background']:'http://www.京大博士deの先生と勉強ネ.jp/assets/img/daniel-olahh.jpg'})`)
    })
  }

  setSupport(amount: HTMLInputElement){
    if (+amount.value < +amount.min) {
      this.toastr.error(
        `<span data-notify="message">Amount must be more then ${amount.min} C.U.</span>`,
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: "toast-top-center"
        }
      )
      return false
    }
    this.companyService.setSupport(this.company_id, amount.value).subscribe(res => {
        this.router.navigate(['/company', this.company_id])
    })
  }
}

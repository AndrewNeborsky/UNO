import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public companies: Company[]

  constructor(private companyService: CompanyService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.companyService.getLastUpdateCompanies().subscribe(res => {
      this.companies = res
    })
  }

  getBackground(image: string) {
    return image?image:'http://www.京大博士deの先生と勉強ネ.jp/assets/img/daniel-olahh.jpg'
  }

}

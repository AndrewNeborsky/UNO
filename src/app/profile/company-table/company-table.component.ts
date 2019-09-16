import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css']
})
export class CompanyTableComponent implements OnInit {

  @Input() user_id: string;
  @Input() isHaveAcces: boolean;
  public companies: Company[];
  sortedCompany: Company[];
  nameSearch: string;
  minGoalSearch: number;
  maxGoalSearch: number;
  minPresentlySearch: number;
  maxPresentlySearch: number;
  expDateSearch: NgbDate;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getUserCompanies(this.user_id).subscribe(res => {
      this.companies = res
      this.sortedCompany = this.companies.slice();
    })
  }

  sortData(sort: Sort) {
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

}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

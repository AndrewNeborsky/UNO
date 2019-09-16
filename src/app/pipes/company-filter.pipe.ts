import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../models/company.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'companyFilter'
})
export class CompanyFilterPipe implements PipeTransform {

  transform(companies: Company[], nameSearch?: string, minGoalSearch?: number, maxGoalSearch?: number,
    minPresentlySearch?: number, maxPresentlySearch?: number, 
    expDateSearch?: NgbDate): any {
    companies = companies.filter((company: Company) => {
      return company.name.toLocaleLowerCase().includes(nameSearch?nameSearch.toLocaleLowerCase():'')
    })
    if(minGoalSearch){
      companies = companies.filter((company: Company) => {
        return company.goal >= minGoalSearch
      })
    }
    if(maxGoalSearch){
      companies = companies.filter((company: Company) => {
        return company.goal <= maxGoalSearch
      })
    }
    if(minPresentlySearch){
      companies = companies.filter((company: Company) => {
        return company.presently >= minPresentlySearch
      })
    }
    if(maxPresentlySearch) {
      companies = companies.filter((company: Company) => {
        return isNaN(maxPresentlySearch)?true:company.presently <= maxPresentlySearch
      })
    }
    if(expDateSearch) {
      let date = new Date(expDateSearch.year, expDateSearch.month - 1, expDateSearch.day)
      companies = companies.filter((company: Company) => {
        company.expiration_date = new Date(company.expiration_date)
        return company.expiration_date >= date
      })
    }
    return companies
  }
}

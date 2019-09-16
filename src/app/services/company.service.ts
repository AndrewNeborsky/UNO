import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { Bonuce } from '../models/bonuce.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url = 'http://localhost:3000/api/company/'

  constructor(private http: HttpClient) { }

  getCompany(company_id: string) {
    return this.http.get<Company>(this.url + company_id)
  }

  createCompany (company: Company) {
    return this.http.post<Company>(this.url + 'create', company)
  }

  changeCompany (company: Company) {
    return this.http.post<string>(this.url + 'change', company)
  }

  deleteImage (image: string) {
    let img_id = image.match(/(UNO_load\/.+)\.\w{3,4}$/)[1]
    return this.http.post(this.url + 'delete_img', {img_id})
  }

  getBonuces(company_id: string){
    return this.http.get<Bonuce[]>(this.url + 'bonuces/' + company_id)
  }

  setSupport(company_id: string, amount: string) {
    return this.http.post<string>(this.url + 'set_support', {company_id, amount})
  }

  getUserCompanies(user_id: string) {
    return this.http.get<Company[]>(this.url + 'user_companies/' + user_id)
  }
}

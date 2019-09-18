import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { SafeResourceUrl, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { Company } from '../../models/company.model'
import { ActivatedRoute, Router } from '@angular/router';
import { Bonuce } from 'src/app/models/bonuce.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/app/models/news.model';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-creater',
  templateUrl: './creater.component.html',
  styleUrls: ['./creater.component.css']
})
export class CreaterComponent implements OnInit {

  public company: Company;
  public newsWindow: News;
  public videoUrl: SafeResourceUrl;
  public background: SafeStyle;
  public modelDate: NgbDate;
  public user_id = this.activatedRoute.snapshot.params.id;

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;

  constructor(private companyService: CompanyService, private sanitizer: DomSanitizer, 
    private activatedRoute: ActivatedRoute, private router: Router, private infoService: InfoService) {
    this.company = new Company();
    this.newsWindow = new News();
  }

  ngOnInit() {
    if(this.user_id) {
      this.company.user_id = this.user_id
      this.company.video = ''
      this.background = this.sanitizer.bypassSecurityTrustStyle(
        'url(http://www.京大博士deの先生と勉強ネ.jp/assets/img/daniel-olahh.jpg)')
    } else {
      this.companyService.getCompany(this.activatedRoute.snapshot.params.company_id).subscribe(res => {
        this.company = res
        let date = new Date(res.expiration_date)
        this.modelDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
        this.background = this.sanitizer.bypassSecurityTrustStyle(
          `url(${this.company.images[0]?this.company.images[0]:'http://www.京大博士deの先生と勉強ネ.jp/assets/img/daniel-olahh.jpg'})`)
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.company.video)
      })
    }

    const uploaderOptions: FileUploaderOptions = {
      url: 'https://api.cloudinary.com/v1_1/dxgv2cfvt/upload',
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'uno_load');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };
    
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: any) => {
      this.company.images.push(JSON.parse(response).secure_url)
      this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${this.company.images[0]})`)
    };
  }

  getSafeUrl(event) {
    event = event.replace(/&t.+$/, '')
    this.company.video = event.replace(/^.+[\.be|be\.com]\/(.+v\=)?(.+)/, 'https://www.youtube.com/embed/$2');
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.company.video)
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  preparationForSend() {
    this.company.expiration_date = new Date(this.modelDate.year, this.modelDate.month, this.modelDate.day)
    this.company.update_date = new Date()
    this.company.goal = Math.abs(this.company.goal)
  }

  errorControl(status: number) {
    if (status === 403) {
      this.infoService.showAlert('You do not have access to perform this action')
    }
  }

  createCompany() {
    this.preparationForSend()
    this.companyService.createCompany(this.company).subscribe(res => {
      this.router.navigate(['/company', res._id])
    }, err => this.errorControl(err['status']))
  }

  changeCompany() {
    this.preparationForSend()
    this.companyService.changeCompany(this.company).subscribe(res => {
      this.router.navigate(['/company', this.company._id])
    }, err => this.errorControl(err['status']))
  }

  deleteImage(image: string) {
    let index = this.company.images.indexOf(image)
    if(~index) {
      this.company.images.splice(index, 1)
      this.background = this.sanitizer.bypassSecurityTrustStyle(
        `url(${this.company.images[0]?this.company.images[0]:'http://www.京大博士deの先生と勉強ネ.jp/assets/img/daniel-olahh.jpg'})`)
    }
    this.companyService.deleteImage(image).subscribe()
  }

  addBonuce(bonuce: Bonuce) {
    this.company.bonuces.push(bonuce)
  }

  addNews(news: News) {
    this.company.news.push(news)
  }

  openNews(news: News){
    this.newsWindow = news;
  }

  deleteBonuce(bonuce: Bonuce) {
    let index = this.company.bonuces.indexOf(bonuce)
    if(~index) {
      this.company.bonuces.splice(index, 1)
    }
  }

  deleteNews(news: News) {
    let index = this.company.news.indexOf(news)
    if(~index) {
      this.company.news.splice(index, 1)
    }
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { News } from 'src/app/models/news.model';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-news-creater',
  templateUrl: './news-creater.component.html',
  styleUrls: ['./news-creater.component.css']
})
export class NewsCreaterComponent implements OnInit {
  @Output() sendNews = new EventEmitter<News>();
  public news: News;
  public imageUploader: FileUploader;
  public isAdd: boolean
  public hasBaseDropZoneOver: boolean

  constructor(private companyService: CompanyService) {
    this.news = new News();
   }

  ngOnInit() {
    this.isAdd = false

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

    this.imageUploader = new FileUploader(uploaderOptions);

    this.imageUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'uno_load');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.imageUploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: any) => {
      if(this.news.image){
        this.deleteNewsImage()
      }
      this.news.image = JSON.parse(response).secure_url
    };
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  addNews(lol) {
    console.log(lol)
    this.news.create_date = new Date()
    this.sendNews.emit(this.news)
    this.news = new News();
    this.isAdd = false
  }

  deleteNewsImage() {
    this.companyService.deleteImage(this.news.image).subscribe()
    this.news.image = ''
  }
}

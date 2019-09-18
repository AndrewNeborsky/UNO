import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { CompanyService } from 'src/app/services/company.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.component.html',
  styleUrls: ['./profile-change.component.css']
})
export class ProfileChangeComponent implements OnInit {

  public id: String;
  public user: User;
  public background: SafeStyle;

  public backgroundUploader: FileUploader;
  public avatarUploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService,
    private sanitizer: DomSanitizer, private router: Router, private companyService: CompanyService,
    private infoService: InfoService) { 
    this.user = new User()
    this.id = this.activatedRoute.snapshot.params.id
   }

  ngOnInit() {
    this.profileService.getUser(this.id).subscribe(res => {
      this.user = res
      this.background = this.sanitizer.bypassSecurityTrustStyle(
        `url(${this.user.background?this.user.background:'https://demos.creative-tim.com/paper-kit-2-pro/assets/img/sections/fabio-mangione.jpg'})`);
    })

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

    this.backgroundUploader = new FileUploader(uploaderOptions);
    this.avatarUploader = new FileUploader(uploaderOptions);

    this.backgroundUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'uno_load');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.avatarUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'uno_load');
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.backgroundUploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: any) => {
      if (this.user.background) {
        this.companyService.deleteImage(this.user.background);
      }
      this.user.background = JSON.parse(response).secure_url
      this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${this.user.background})`)
    };

    this.avatarUploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: any) => {
      if(this.user.profile_img !== 'http://www.urhobosocialclublagos.com/wp-content/uploads/2017/07/default-avatar-ginger-guy.png') {
        this.companyService.deleteImage(this.user.profile_img)
      }
      this.user.profile_img = JSON.parse(response).secure_url
    };
  }

  changeProfile() {
    this.profileService.changeProfile(this.user).subscribe(
      res => this.router.navigate(['/profile', res._id])
    )
  }
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
}

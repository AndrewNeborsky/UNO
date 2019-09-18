import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company.model';
import { SafeStyle, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CommentService]
})
export class CompanyComponent implements OnInit {

  public company_id: string;
  public company: Company;
  public user: User;
  public thisUser: User;
  public background: SafeStyle;
  public videoUrl: SafeResourceUrl;
  public companyIsStopped: boolean;

  constructor(private activatedRoute: ActivatedRoute, private companyService: CompanyService, 
    private sanitizer: DomSanitizer, private auth: AuthService, private commentService: CommentService,
    private profileService: ProfileService) { 
    this.company_id = this.activatedRoute.snapshot.params.company_id
    this.company = new Company()
    this.user = new User()
  }

  ngOnInit() {
    this.companyService.getCompany(this.company_id).subscribe(res => {
      this.company = res
      this.background = this.sanitizer.bypassSecurityTrustStyle(
        `url(${this.company.images[0]?this.company.images[0]:'http://www.京大博士deの先生と勉強ネ.jp/assets/img/daniel-olahh.jpg'})`)
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.company.video)
      this.profileService.getUser(this.company.user_id).subscribe(result => {
        this.user = result
      })
      const dayToday = new Date()
      this.companyIsStopped = dayToday > new Date(this.company.expiration_date)?true:false
    })
    this.auth.getThisUser().subscribe( res => {
      this.thisUser = res;
    })
    this.commentService.getComment().subscribe((comment: Comment) => {
      this.company.comments.push(comment)
    })
  }

  sendComment(comment: Comment) {
    this.commentService.sendComment(this.company_id, comment)
  }
}
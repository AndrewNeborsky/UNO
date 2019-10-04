import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoService } from '../services/info.service';
import Config from '../config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  public id: Number;
  public host: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private infoService: InfoService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.host = Config.host;
    });
  }

  ngOnInit() {
    if (this.id) {
      this.auth.socialLogin(this.id).subscribe(
        res => {
          localStorage.setItem('token', res['token']);
          this.router.navigate(['/']);
        },
        err => {
          if (err.status === 401 || err.status === 423) this.openAlert(err['error']);
        }
      );
    }
  }

  openAlert(text: string) {
    this.infoService.showAlert(text);
  }
}

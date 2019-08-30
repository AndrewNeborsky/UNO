import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : User;

  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService) {
    this.user = new User ();
  }

  ngOnInit() {
  }

  login () {
    this.auth.login(this.user).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res['token'])
        this.cookieService.set('id', res['id'])
        this.router.navigate(['/'])
      },
      err => console.log(err)
    )
  }
}

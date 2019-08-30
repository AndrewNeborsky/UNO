import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public user : User;

  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService) {
    this.user = new User ();
  }

  ngOnInit() {
  }

  register(){
    this.auth.register(this.user).subscribe(
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

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() alertOpen = new EventEmitter<string>();
  public user : User;

  constructor(private auth: AuthService, private router: Router) {
    this.user = new User ();
  }

  ngOnInit() {
  }

  login () {
    if (this.user.email && this.user.password) {
      this.auth.login(this.user).subscribe(
        res => {
          localStorage.setItem('token', res['token'])
          this.router.navigate(['/'])
        },
        err => {
          if(err.status === 401) this.alertOpen.emit(err['error'])
        }
      )
    } else {
      this.alertOpen.emit('Please fill in all the fields')
    }
  }
}

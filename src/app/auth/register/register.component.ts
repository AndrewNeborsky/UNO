import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() alertOpen = new EventEmitter<string>();
  public user : User;

  constructor(private auth: AuthService, private router: Router) {
    this.user = new User ();
  }

  ngOnInit() {
  }

  register(){
    if (this.user.name && this.user.email && this.user.password) {
      this.auth.register(this.user).subscribe(
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

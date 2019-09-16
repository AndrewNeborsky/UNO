import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public id: Number;

  constructor(private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id']
    })
  }

  ngOnInit() {
    if(this.id){
      this.auth.socialLogin(this.id).subscribe(res => {
        localStorage.setItem('token', res['token'])
        this.router.navigate(['/'])
      })
    }
  }

  openAlert(text: string){
    this.toastr.error(
      `<span data-notify="message">${text}</span>`,
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger",
          positionClass: "toast-top-center"
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public id: Number;

  constructor(private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
    private infoService: InfoService) { 
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
    this.infoService.showAlert(text)
  }
}

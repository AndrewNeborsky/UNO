import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public id: String;
  public user: User;

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService) {
    this.user = new User()
    this.id = this.activatedRoute.snapshot.params.id
   }

  ngOnInit() {
    this.profileService.getUser(this.id).subscribe(res => {
      this.user.name = res['name']
      this.user.email = res['email']
    })
  }

}

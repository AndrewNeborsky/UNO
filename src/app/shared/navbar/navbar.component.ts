import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private toggleButton: any;
    private sidebarVisible: boolean;
    private user_id: string;
    public companies: Company[]
    public thisUser: User;

    constructor(public location: Location, private element : ElementRef, private auth: AuthService, private router: Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    checkPath(values: String) {
        let path = this.location.prepareExternalUrl(this.location.path());
        let paths = values.split(' ')
        if(path.charAt(0) === '#'){
            path = path.slice( 1 );
        }
        for (let i = 0; i < paths.length; i++){
            if(~path.indexOf(paths[i])) {
                return true;
            }
        }
        return false
    }

    checkLogin(){
        return !!this.auth.getToken();
    }

    logout() {
        this.auth.logout()
    }

    getProfile() {
        this.auth.getThisUser().subscribe(res => {
            this.thisUser = res
            this.router.navigate(['/profile', this.thisUser._id])
        })
    }
}

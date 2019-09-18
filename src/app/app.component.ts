import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private location: Location, private renderer: Renderer2, private element: ElementRef) {}

  ngOnInit () {
    var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
    this.renderer.listen('window', 'scroll', (event) => {
      const number = window.scrollY;
      if (number > 150 || window.pageYOffset > 150) {
          navbar.classList.remove('navbar-transparent');
      } else {
          navbar.classList.add('navbar-transparent');
      }
  });
  }

  removeFooter() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    if(titlee === 'auth' || titlee === 'search' || titlee === 'admin'){
        return false;
    }
    else {
        return true;
    }
}
}

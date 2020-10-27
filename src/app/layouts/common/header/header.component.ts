import { Component, OnInit } from '@angular/core';
import { NavigationEnd,Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean;
  constructor(private authentication:AuthenticationService,private router:Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if(this.authentication.isLoggedIn){
        if (event.url === '/') {
          this.login= true;
        } else {
          this.login= false;
        }
      }
      }
   });
  }

  ngOnInit() {
  }

  logout(){
    this.authentication.logout();
  }

}

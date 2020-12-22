import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
//import { NotifierService } from 'angular-notifier';
import { MenuXUsers } from '../../../_models/Menus';
import { ApiService } from '../../../_services/api.service';
import { AuthenticationService } from '../../../_services/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean;
  headermenuxusers: MenuXUsers[];
  constructor(private authentication: AuthenticationService, private router: Router, private apiservice: ApiService,)
    //private notifier: NotifierService 
    {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this.authentication.isLoggedIn) {
          if (event.url === '/') {
            this.login = true;
          } else {
            this.login = false;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.Loadusermenus();
  }

  Loadusermenus() {
    var userid = localStorage.getItem('UserId');
    this.apiservice.GetMenusbyUserID(parseInt(userid)).subscribe((items: any) => {
      if (items.length > 0)
        this.headermenuxusers = JSON.parse(JSON.stringify(items));
    },
      error => {
        console.log(error);
        //this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getparentmenus() {
    if (this.headermenuxusers != null) {
      return this.headermenuxusers.filter(f => f.parentid == 0);
    }
  }

  getchildrens(parent: MenuXUsers) {
    return this.headermenuxusers.filter(f => f.parentid == parent.menuid);
  }

  logout() {
    this.authentication.logout();
  }

}

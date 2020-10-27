import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('currentUser')){
      let user=JSON.parse(localStorage.getItem('currentUser'));
      if(user!=null){
        return true;
      }
    }
      this.router.navigate([''], { queryParams:{returnUrl:state.url}});
    }
  }

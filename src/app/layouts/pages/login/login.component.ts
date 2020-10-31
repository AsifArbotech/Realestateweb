import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { User } from '../../../_models/user';
import { ApiService } from '../../../_services/api.service';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User;

  private readonly notifier: NotifierService;

  logindata;
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private authenticationService: AuthenticationService, 
              private router: Router, 
              private apiservice: ApiService,
              notifierService: NotifierService,  ) {

          this.notifier = notifierService;
       }

  ngOnInit() {
  }

  submitForm(loginForm) {
    if (loginForm.form.valid) {
      loginForm.ngSubmit.emit()
    } else {
      this.notifier.notify("error", "Invalid username/password");
    }
  }

  logout() {
    this.authenticationService.logout(true);
    this.router.navigate(['']);
    this.notifier.notify("success", "Logout Success");
  }

  login(){
    this.authenticationService.login(this.model.username,this.model.password)
    .subscribe(
      (user:User)=>{
        if(user){
          localStorage.setItem('UserId', "" + user.Id);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/Dashboard']);
          this.notifier.notify("success", "Login Success");
        }
        else
            this.router.navigate([this.returnUrl]);
     },
    error => {
      this.notifier.notify("error", "Invalid username/password");
    });
  }

  onNavigate(url: string) {
    this.router.navigateByUrl(url);
  }
  
  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  user() {
    return this.authenticationService.getUser();
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  logindata;
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private apiservice: ApiService,
    private toastr: ToastrService,) {
  }

  ngOnInit() {
  }

  submitForm(loginForm) {
    if (loginForm.form.valid) {
      loginForm.ngSubmit.emit()
    } else {
      this.toastr.error('Invalid username/password');      
    }
  }

  logout() {
    this.authenticationService.logout(true);
    this.router.navigate(['']);
    this.toastr.success('Logout Success');  
  }

  login() {
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        (user: any) => {
          if (user) {
            if (user.responseCode == 1) {
              localStorage.setItem('UserId', "" + user.result.id);
              localStorage.setItem('currentUser', JSON.stringify(user.result));
              this.router.navigate(['/Dashboard']);
              this.toastr.success('Login Success');  
            }
            else{
              this.toastr.error('Invalid username/password');  
            }
          }
          else
            this.router.navigate([this.returnUrl]);
        },
        error => {
          this.toastr.error('Invalid username/password');  
        });
  }

 // refresh():void{
 //   //window.location.reload();
 //   //this.router.navigate(['/OfflineChat']);
 //   this.router.navigate(["/Dashboard"]).then(() => {
 //     location.reload();
 //   })
 // }

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

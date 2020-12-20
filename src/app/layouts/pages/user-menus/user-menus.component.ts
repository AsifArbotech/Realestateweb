import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AddUser } from 'src/app/_models/user';
import { MenuXUsers } from 'src/app/_models/Menus';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-user-menus',
  templateUrl: './user-menus.component.html',
  styleUrls: ['./user-menus.component.css']
})
export class UserMenusComponent implements OnInit {

  usersListItems: AddUser[];
  menuxusers: MenuXUsers[];
  selectedmenus: number[] = [];
  constructor(private apiservice: ApiService,
    private notifier: NotifierService,) { }

  ngOnInit(): void {
    this.setusers();
  }

  setusers() {
    this.apiservice.getUsers().subscribe(
      (items: Array<AddUser>) => {
        this.usersListItems = items
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  Loadusermenus() {
    this.selectedmenus = [];
    var userid: any = document.getElementById("userid");
    if (userid[userid.selectedIndex].value > 0) {
      this.apiservice.GetAllMenuswithUserID(userid[userid.selectedIndex].value).subscribe((items: any) => {
        this.menuxusers = JSON.parse(JSON.stringify(items.result));
        this.selectedmenus = [];
        this.menuxusers.filter(k => k.userid != null && k.parentid > 0).forEach(item => {
          this.selectedmenus.push(item.menuid);
        })

      },
        error => {
          console.log(error);
          this.notifier.notify("error", "Something went wrong");
        }
      )
    }
    else{
      this.selectedmenus = [];
      this.menuxusers=[];
    }
  }

  onCheckboxChange(event) {
    debugger;
    if (event.target.checked) {
      this.selectedmenus.push(parseInt(event.target.value));
    } else {
      const index =   this.selectedmenus.indexOf(parseInt(event.target.value));
      if (index > -1) {
        this.selectedmenus.splice(index, 1);
      }
    }
  }

  getparentmenus() {
    if (this.menuxusers != null) {
      return this.menuxusers.filter(f => f.parentid == 0);
    }
  }

  getchildrens(parent: MenuXUsers) {
    return this.menuxusers.filter(f => f.parentid == parent.menuid);
  }

  checkedvalue(item: MenuXUsers) {
    if (item.userid != null) {

      return true
    }
    else {
      return false;
    }
  }

  savemenus(){
    var userid: any = document.getElementById("userid");
    this.apiservice.AddUserMenus(this.selectedmenus,parseInt(userid[userid.selectedIndex].value)).subscribe((items: any) => {
      this.menuxusers = JSON.parse(JSON.stringify(items.result));
      this.selectedmenus = [];
      this.menuxusers.filter(k => k.userid != null && k.parentid > 0).forEach(item => {
        this.selectedmenus.push(item.menuid);
      })

    },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }
}

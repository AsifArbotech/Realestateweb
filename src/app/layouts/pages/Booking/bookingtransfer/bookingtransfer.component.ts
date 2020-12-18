import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../../../../_services/api.service';
import { BookingTransfer, Bookings } from '../../../../_models/Booking';
import { Customers } from '../../../../_models/Customers';
import { Property } from '../../../../_models/property';

@Component({
  selector: 'app-bookingtransfer',
  templateUrl: './bookingtransfer.component.html',
  styleUrls: ['./bookingtransfer.component.css']
})
export class BookingtransferComponent implements OnInit {
  public customerslist: Array<Customers> = new Array<Customers>();
  public propertyListItems: Array<Property> = new Array<Property>();
  public allbookinglist: Array<Bookings> = new Array<Bookings>();
  public bookingList: Array<Bookings> = new Array<Bookings>();
  bookingtransfer: BookingTransfer = new BookingTransfer();
  ActionType = "Add Booking Transfer";
  page = 1;
  pageSize = 10;
  projectname: String = '';
  unit: String = '';
  customername: String = '';
  bookingno = '';

  constructor(private apiservice: ApiService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getBookingTransList();
    this.getAllBookings();
    this.getCustomerslist();    
    this.getPropertyList();
  }

  getBookingTransList() {
    this.apiservice.getBookingTransfList().subscribe(
      (response: any) => {
        this.allbookinglist = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getBookingTranslistItems() {
    if (this.allbookinglist)
      if (this.allbookinglist.length > this.pageSize) {
        return this.allbookinglist.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.allbookinglist;
    }
  }

  SaveBookingTransf(){
    if (parseInt((<HTMLInputElement>document.getElementById('bookingno')).value) == NaN) {
      alert("Invalid Booking No.");
      return false;
    }
    if ((<HTMLInputElement>document.getElementById('NewCustomerid')).value)
    this.bookingtransfer.newcustomerid = this.customerslist.find(f => f.name == (<HTMLInputElement>document.getElementById('NewCustomerid')).value).id;
    else {
    alert("Please select Customer form list");
    return;
    }

    if ((<HTMLInputElement>document.getElementById('NewPropertyid')).value)
    this.bookingtransfer.newunitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('NewPropertyid')).value).id;
    else {
    alert("Please select Property form list");
    return;
    }
    this.bookingtransfer.bookingid = this.bookingList.find(f => f.bookingno == parseInt((<HTMLInputElement>document.getElementById('bookingno')).value)).bookingid;
    this.bookingtransfer.newsellingprice = Number(this.bookingtransfer.newsellingprice);
    this.apiservice.AddBookingTransf(this.bookingtransfer)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.notifier.notify("error", response.responseMsg);
          } else if (response.responseCode == 1) {
            this.notifier.notify("success", response.responseMsg);
          }
          else {
            this.notifier.notify("error", "Something went wrong");
          }
          this.bookingtransfer = new BookingTransfer();
          this.getBookingTransList();
        }
      })
  }

  getCustomerslist() {
    this.apiservice.getCustomers().subscribe(
      (response: any) => {
        this.customerslist = response
      },
      error => {
        console.log(error);

      }
    )
  }

  getPropertyList() {
    this.apiservice.getProperties().subscribe(
      (response: any) => {
        this.propertyListItems = response
      },
      error => {
        console.log(error);
      }
    )
  }

  getAllBookings() {
    this.apiservice.getBookingList().subscribe(
      (response: any) => {
        this.bookingList = response
      },
      error => {
        console.log(error);

      }
    )
  }

  getbookingdetails(event: KeyboardEvent) {
    if (parseInt((event.target as HTMLInputElement).value) != NaN) {
     var obj= this.bookingList.find(f => f.bookingno == Number((event.target as HTMLInputElement).value))
      if (obj) {
        this.projectname = obj.projectname;
        this.unit = obj.plotno;
        this.customername = obj.customername;
      }
    }
  }

  clearfields() {
    (<HTMLInputElement>document.getElementById('Customerid')).value = "";
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    this.bookingtransfer = new BookingTransfer();
    this.projectname ='';
    this.unit = '';
    this.customername = '';
    this.bookingno = '';
  }
}

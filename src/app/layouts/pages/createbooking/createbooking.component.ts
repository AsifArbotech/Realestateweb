import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { Bookings , AddBooking } from '../../../_models/Booking';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {

  public addBookinglist: Array<Bookings> = new Array<Bookings>();
  public BookingsList: Array<Bookings> = new Array<Bookings>();
   addBooking: AddBooking = new AddBooking();

   ActionType = "Add Booking";
   page = 1;
   pageSize = 10;
   projectname: String = '';
   unit: String = '';
   customername: String = '';
   associatename: String = '';

  constructor( private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getBookingList();
    this.getCustomerList();
  }

  getBookingList() {
    this.apiservice.getBookingList().subscribe(
      (response: any) => {
        this.BookingsList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getBookinglistItems() {
    if (this.BookingsList)
      if (this.BookingsList.length > this.pageSize) {
        return this.BookingsList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.BookingsList;
      }
  }

  getProjectList(){
    this.apiservice.getProjects().subscribe(
      (response: any) => {
        this.BookingsList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getUnitList(){
    this.apiservice.getProperties().subscribe(
      (response: any) => {
        this.BookingsList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getCustomerList(){
    this.apiservice.getCustomers().subscribe(
      (response: any) => {
        this.BookingsList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getAssociateList(){
    this.apiservice.getAssociates().subscribe(
      (response: any) => {
        this.BookingsList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getenquiredetails(event: KeyboardEvent) {
    if (parseInt((event.target as HTMLInputElement).value) != NaN) {
     var obj= this.BookingsList.find(f => f.customername == (event.target as HTMLInputElement).value)
      if (obj) {
        //this.associatename = obj.consultantname;
        this.customername = obj.customername;
      }
    }
  }

  GetAllSuggesstion() {
    //this.clearfields();
    this.ActionType = "Add Sales Quotation";
  }

}

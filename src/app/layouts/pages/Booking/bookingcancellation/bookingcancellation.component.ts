import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { Bookings, BookingCancellation } from '../../../../_models/Booking';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-bookingcancellation',
  templateUrl: './bookingcancellation.component.html',
  styleUrls: ['./bookingcancellation.component.css']
})
export class BookingcancellationComponent implements OnInit {

  public Bookingcanclist: Array<Bookings> = new Array<Bookings>();
  public BookingsList: Array<Bookings> = new Array<Bookings>();
   Bookingcanc: BookingCancellation = new BookingCancellation();

   ActionType = "Add Booking Cancellation";
   page = 1;
   pageSize = 10;
   projectname: String = '';
   unit: String = '';
   customername: String = '';
   bookingno = '';

  constructor(private apiservice: ApiService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getBookingCancList();
    this.getAllBookings();
  }

  getBookingCancList() {
    this.apiservice.getBookingCancList().subscribe(
      (response: any) => {
        this.BookingsList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getBookingCanclistItems() {
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

  getAllBookings() {
    this.apiservice.getBookingList().subscribe(
      (response: any) => {
        this.Bookingcanclist = response
      },
      error => {
        console.log(error);

      }
    )
  }

  SaveBookingCanc(){
    if (parseInt((<HTMLInputElement>document.getElementById('bookingno')).value) == NaN) {
      alert("Invalid Booking No.");
      return false;
    }
    this.Bookingcanc.bookingid = this.Bookingcanclist.find(f => f.bookingno == parseInt((<HTMLInputElement>document.getElementById('bookingno')).value)).bookingid;
    this.Bookingcanc.amount = Number(this.Bookingcanc.amount);
    this.apiservice.AddBookingCanc(this.Bookingcanc)
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
          this.Bookingcanc = new BookingCancellation();
          this.getBookingCancList();
        }
      })
  }

  EditBookingCanc(id) {
    this.ActionType = "Edit Booking Cancellation";
    this.GetAllSuggesstion();
    this.apiservice.getBookingCancByID(id).subscribe(
      (response: BookingCancellation) => {
        //response.createdon = new Date(response.createdon.toString().split('T')[0]);
        //response.createdon = response.createdon;
        this.Bookingcanc = response;
        var obj = this.Bookingcanclist.find(f => f.bookingid == Number(this.Bookingcanc.bookingid))
        if (obj) {
          this.projectname = obj.projectname;
          this.unit = obj.plotno;
          this.customername = obj.customername;
          this.bookingno = obj.bookingno.toString();
        }

      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )

    this.ActionType = "Edit Booking Cancellation";
  }

  DeleteBookingCanc(id) {
    if (confirm("Do You wish to Delete the Booking Cancellation?")) {
      this.apiservice.DeleteBookingCanc(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.notifier.notify("error", response.responseMsg);
            } else if (response.responseCode == 1) {
              this.notifier.notify("success", response.responseMsg);
              this.getBookingCancList();
            }
          }
        })
    }
  }

  getbookingdetails(event: KeyboardEvent) {
    if (parseInt((event.target as HTMLInputElement).value) != NaN) {
     var obj= this.Bookingcanclist.find(f => f.bookingno == Number((event.target as HTMLInputElement).value))
      if (obj) {
        this.projectname = obj.projectname;
        this.unit = obj.plotno;
        this.customername = obj.customername;
      }
    }
  }

  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Booking Cancellation";
  }

  clearfields() {
    this.Bookingcanc = new BookingCancellation();
    this.projectname ='';
    this.unit = '';
    this.customername = '';
    this.bookingno = '';
  }

}

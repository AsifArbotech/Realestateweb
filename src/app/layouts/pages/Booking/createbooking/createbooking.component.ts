import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../_services/api.service';
import { Bookings , AddBooking } from '../../../../_models/Booking';
import { ToastrService } from 'ngx-toastr';
import { Customers } from '../../../../_models/Customers';
import { Project } from '../../../../_models/project';
import { Property } from '../../../../_models/property';
import { Associate } from '../../../../_models/Associate';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  public customerslist: Array<Customers> = new Array<Customers>();
  public projectsListItems: Array<Project> = new Array<Project>();
  public propertyListItems: Array<Property> = new Array<Property>();
  public AssociateList: Array<Associate> = new Array<Associate>();
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
    private toastr: ToastrService,
    private modalService: NgbModal) {
    }

  ngOnInit(): void {
    this.getBookingList();
    this.getCustomerslist();
    this.getProjectsList();
    this.getPropertyList();
    this.getAssociateList();
  }

  getBookingList() {
    this.apiservice.getBookingList().subscribe(
      (response: any) => {
        this.addBookinglist = response;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }

  getBookinglistItems() {
    if (this.addBookinglist)
      if (this.addBookinglist.length > this.pageSize) {
        return this.addBookinglist.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.addBookinglist;
      }
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

  getProjectsList() {
    this.apiservice.getProjects().subscribe(
      (response: any) => {
        this.projectsListItems = response
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

  getAssociateList() {
    this.apiservice.getAssociates().subscribe(
      (response: any) => {
        this.AssociateList = response
      },
      error => {
        console.log(error);
      }
    )
  }

  SaveBooking() {
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.addBooking.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
      return;
    }
      

    if ((<HTMLInputElement>document.getElementById('Customerid')).value)
      this.addBooking.customerid = this.customerslist.find(f => f.name == (<HTMLInputElement>document.getElementById('Customerid')).value).id;
    else {
      alert("Please select Customer form list");
      return;
    }

    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.addBooking.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
      return;
    }

    if ((<HTMLInputElement>document.getElementById('Associateid')).value)
      this.addBooking.consultantid = this.AssociateList.find(f => f.name == (<HTMLInputElement>document.getElementById('Associateid')).value).id;
    else {
      alert("Please select Associate form list");
      return;
    }
    this.addBooking.bookingamount = Number(this.addBooking.bookingamount);
    this.addBooking.totalamount = Number(this.addBooking.totalamount);
    this.apiservice.AddBooking(this.addBooking)
    .subscribe((response: any) => {
      if (response) {
        if (response.responseCode == 0) {
          this.toastr.error(response.responseMsg);
        } else if (response.responseCode == 1) {
          this.modalService.dismissAll();
          this.toastr.success(response.responseMsg);
        }
        else {
          this.toastr.error('Something went wrong');
        }
        this.clearfields();
        this.getBookingList();
      }
    })
  }

  EditBooking(id) {
    this.ActionType = "Edit Booking";
    this.GetAllSuggesstion();
    this.apiservice.getBookingByID(id).subscribe(
      (response: AddBooking) => {
       // response.createdon = new Date(response.createdon.toString().split('T')[0]);
        response.createdon =response.createdon;
        this.addBooking = response;
        (<HTMLInputElement>document.getElementById('Projectid')).value = this.projectsListItems.find(f => f.projectid == this.addBooking.projectid).projectname;
        (<HTMLInputElement>document.getElementById('Customerid')).value = this.customerslist.find(f => f.id == this.addBooking.customerid).name;
        (<HTMLInputElement>document.getElementById('Propertyid')).value = this.propertyListItems.find(f => f.id == this.addBooking.unitid).plotno;
        (<HTMLInputElement>document.getElementById('Associateid')).value = this.AssociateList.find(f => f.id == this.addBooking.consultantid).name;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )

    this.ActionType = "Edit Booking";
  }

  DeleteBooking(id) {
    if (confirm("Do You wish to Delete the Booking?")) {
      this.apiservice.DeleteBooking(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.toastr.error(response.responseMsg);
            } else if (response.responseCode == 1) {
              this.toastr.success(response.responseMsg);
              this.getBookingList();
            }
          }
        })
    }
  }

  clearfields() {
    (<HTMLInputElement>document.getElementById('Projectid')).value = "";
    (<HTMLInputElement>document.getElementById('Customerid')).value = "";
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    (<HTMLInputElement>document.getElementById('Associateid')).value = "";
    this.addBooking = new AddBooking();
  }

  
  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Booking";
    if (this.customerslist.length == 0)
      this.getCustomerslist();
    if (this.projectsListItems.length == 0)
      this.getProjectsList();
    if (this.propertyListItems.length == 0)
      this.getPropertyList();

    if (this.AssociateList.length == 0)
      this.getAssociateList();
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };

  //getenquiredetails(event: KeyboardEvent) {
  //  if (parseInt((event.target as HTMLInputElement).value) != NaN) {
  //   var obj= this.addBookinglist.find(f => f.customername == (event.target as HTMLInputElement).value)
  //    if (obj) {
  //      this.projectname = obj.projectname;
  //      this.unit = obj.plotno;
  //      this.associatename = obj.consultantname;
  //      this.customername = obj.customername;
  //    }
  //  }
  //}
}

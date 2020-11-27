import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { AppConfig } from '../app.config'
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()

export class ApiService {

  private BASEURL: any = '';
  public error: any;

  public headers: Headers;

  constructor(public http: HttpClient, private config: AppConfig, private authService: AuthenticationService) {
    this.BASEURL = this.config.BaseUrl;
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.access_token) {
      this.headers.append('Authorization', 'Bearer ' + currentUser.token);
    }
  }

  getAuthHeaders() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      return { headers: { 'Authorization': 'Bearer ' + currentUser.access_token } };

    }
  }

  getAuthHeadersJSON() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {

      return { headers: { 'Authorization': 'Bearer ' + currentUser.access_token, 'Content-Type': 'application/json' } };

    }
  }

  getHeadersJSON() {
    return { headers: { 'Content-Type': 'application/json' } }
  }

  getUsers() {
    return this.http.get(this.BASEURL + '/Users/GetAllUsers', this.getAuthHeadersJSON());
  }

  getUser(id) {
    return this.http.get(this.BASEURL + '/Users/GetUsersbyID?ID=' + id, this.getAuthHeadersJSON());
  }

  AddUser(data: any) {
    return this.http.post(this.BASEURL + '/Users/AddUser', data, this.getAuthHeadersJSON());
  }

  DeleteUser(id: any) {
    return this.http.get(this.BASEURL + '/Users/DeleteUser?ID=' + id, this.getAuthHeadersJSON());
  }

  EditUser(id) {
    return this.http.post(this.BASEURL + '/Users/EditUser', id, this.getAuthHeadersJSON());
  }

  getDepartments() {
    return this.http.get(this.BASEURL + '/Departments/GetAllDepartment', this.getAuthHeadersJSON());
  }

  getDepartment(id) {
    return this.http.get(this.BASEURL + '/Departments/GetAllDepartment?ID=' + id, this.getAuthHeadersJSON());
  }

  AddDepartment(data: any) {
    return this.http.post(this.BASEURL + '/Departments/AddDepartment', data, this.getAuthHeadersJSON());
  }

  DeleteDepartment(id) {
    return this.http.get(this.BASEURL + '/Departments/DeleteDepartment?ID=' + id, this.getAuthHeadersJSON());
  }

  EditDept(id) {
    return this.http.post(this.BASEURL + '/Departments/EditDepartment', id, this.getAuthHeadersJSON());
  }

  getRoles() {
    return this.http.get(this.BASEURL + '/Roles/GetAllRoles', this.getAuthHeadersJSON());
  }

  AddRole(data: any) {
    return this.http.post(this.BASEURL + '/Roles/AddRole', data, this.getAuthHeadersJSON());
  }

  DeleteRole(id) {
    return this.http.get(this.BASEURL + '/Roles/DeleteRoles?ID=' + id, this.getAuthHeadersJSON());
  }

  getCustomers() {
    return this.http.get(this.BASEURL + '/Customer/GetAllCustomer', this.getAuthHeadersJSON());
  }

  AddCustomers(data) {
    if (data.id) {
      return this.http.post(this.BASEURL + '/Customer/EditCustomer', data, this.getAuthHeadersJSON());
    }
    return this.http.post(this.BASEURL + '/Customer/AddCustomer', data, this.getAuthHeadersJSON());
  }

  //EditCCustomers(id) {
  //  return this.http.post(this.BASEURL + '/Client/EditClient', id, this.getAuthHeadersJSON());
  //}

  DeleteCustomers(id) {
    return this.http.post(this.BASEURL + '/Customer/DeleteCustomer?ID=' + id, this.getAuthHeadersJSON());
  }

  getCustomer(id) {
    return this.http.get(this.BASEURL + '/Customer/GetCustomerById?ID=' + id, this.getAuthHeadersJSON());
  }

  getProjects() {
    return this.http.get(this.BASEURL + '/Project/GetAllProject', this.getAuthHeadersJSON());
  }

  AddProject(data) {
    return this.http.post(this.BASEURL + '/Project/AddProject', data, this.getAuthHeadersJSON());
  }

  getProject(id) {
    return this.http.get(this.BASEURL + '/Project/GetProjectByID?ID=' + id, this.getAuthHeadersJSON());
  }

  EditProject(data){
    return this.http.post(this.BASEURL+'/Project/EditProject',data,this.getAuthHeadersJSON());
  }

  DeleteProject(id){
    return this.http.get(this.BASEURL+ '/Project/DeleteProject?ID=' + id, this.getAuthHeadersJSON());
  }

  getProperties(){
    return this.http.get(this.BASEURL+ '/Property/GetAllProperty', this.getAuthHeadersJSON());
  }

  getProperty(id){
    return this.http.get(this.BASEURL+ '/Property/GetPropertyByID?ID=' + id, this.getAuthHeadersJSON());
  }

  EditProperty(data){
    return this.http.post(this.BASEURL+'/Property/EditProperty',data,this.getAuthHeadersJSON());
  }

  AddProperty(data) {
    return this.http.post(this.BASEURL + '/Property/AddProperty', data, this.getAuthHeadersJSON());
  }

  DeleteProperty(id) {
    return this.http.get(this.BASEURL + '/Property/DeleteProperty?ID=' + id, this.getAuthHeadersJSON());
  }

  getOwners() {
    return this.http.get(this.BASEURL + '/Owners/GetAllOwners', this.getAuthHeadersJSON());
  }

  getOwner(id){
    return this.http.get(this.BASEURL+ '/Owners/GetOwnersByID?ID=' + id, this.getAuthHeadersJSON());
  }

  AddOwner(data) {
    return this.http.post(this.BASEURL + '/Owners/AddOwner', data, this.getAuthHeadersJSON());
  }

  EditOwner(data){
    return this.http.post(this.BASEURL+'/Owners/EditOwners',data,this.getAuthHeadersJSON());
  }

  DeleteOwner(id){
    return this.http.get(this.BASEURL+ '/Owners/DeleteOwners?ID=' + id, this.getAuthHeadersJSON());
  }

  //Add Consultant or Associate
  AddAssociate(associate) {
    if (associate.id) {
      return this.http.post(this.BASEURL + '/Consultant/EditConsultant', associate, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Consultant/AddConsultant', associate, this.getAuthHeadersJSON());
  }

  getAssociates() {
    return this.http.get(this.BASEURL + '/Consultant/GetAllConsultant', this.getAuthHeadersJSON());
  }

  getAssociateByID(ID) {
    return this.http.get(this.BASEURL + '/Consultant/GetConsultantById?ID=' + ID, this.getAuthHeadersJSON());
  }

  DeleteAssociateByID(ID) {
    return this.http.get(this.BASEURL + '/Consultant/DeleteConsultant?ID=' + ID, this.getAuthHeadersJSON());
  }


  //  Sales Enquire Services
  AddSalesEnquire(Enquire) {
    if (Enquire.id) {
      return this.http.post(this.BASEURL + '/SalesEnquire/EditSalesEnquire', Enquire, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/SalesEnquire/AddSalesEnquire', Enquire, this.getAuthHeadersJSON());
  }

  getSalesEnquireList() {
    return this.http.get(this.BASEURL + '/SalesEnquire/GetAllSalesEnquire', this.getAuthHeadersJSON());
  }

  getSalesEnquireByID(ID) {
    return this.http.get(this.BASEURL + '/SalesEnquire/GetSalesEnquireById?ID=' + ID, this.getAuthHeadersJSON());
  }

  DeleteSalesEnquireByID(ID) {
    return this.http.get(this.BASEURL + '/SalesEnquire/DeleteSalesEnquire?ID=' + ID, this.getAuthHeadersJSON());
  }

  //  Sales Enquire Services
  AddSalesInvoice(Invoice) {
    if (Invoice.id) {
      return this.http.post(this.BASEURL + '/SalesInvoice/EditSalesInvoice', Invoice, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/SalesInvoice/AddSalesInvoice', Invoice, this.getAuthHeadersJSON());
  }

  getSalesInvoiceList() {
    return this.http.get(this.BASEURL + '/SalesInvoice/GetAllSalesInvoice', this.getAuthHeadersJSON());
  }

  getSalesInvoiceByID(ID) {
    return this.http.get(this.BASEURL + '/SalesInvoice/GetSalesInvoiceById?ID=' + ID, this.getAuthHeadersJSON());
  }

  DeleteSalesInvoiceByID(ID) {
    return this.http.get(this.BASEURL + '/SalesInvoice/DeleteSalesInvoice?ID=' + ID, this.getAuthHeadersJSON());
  }

  getSalesQuotList() {
    return this.http.get(this.BASEURL + '/SalesQuotation/GetAllSalesQuotation', this.getAuthHeadersJSON());
  }

  getSalesQuotByID(ID) {
    return this.http.get(this.BASEURL + '/SalesQuotation/GetSalesQuotationById?ID=' + ID, this.getAuthHeadersJSON());
  }

  AddSalesQuot(Invoice){
    if (Invoice.id) {
      return this.http.post(this.BASEURL + '/SalesQuotation/EditSalesQuotation', Invoice, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/SalesQuotation/AddSalesQuotation', Invoice, this.getAuthHeadersJSON());
  }

  DeleteSalesQuot(ID) {
    return this.http.get(this.BASEURL + '/SalesQuotation/DeleteSalesQuotation?ID=' + ID, this.getAuthHeadersJSON());
  }

  getBookingList() {
    return this.http.get(this.BASEURL + '/Booking/GetAllBookings', this.getAuthHeadersJSON());
  }

  getBookingByID(ID) {
    return this.http.get(this.BASEURL + '/Booking/GetBookingById?ID=' + ID, this.getAuthHeadersJSON());
  }

  AddBooking(Booking){
    if (Booking.bookingid) {
      return this.http.post(this.BASEURL + '/Booking/EditBooking', Booking, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Booking/AddBooking', Booking, this.getAuthHeadersJSON());
  }

  DeleteBooking(ID) {
    return this.http.get(this.BASEURL + '/Booking/DeleteBooking?ID=' + ID, this.getAuthHeadersJSON());
  }

  getBookingCancList() {
    return this.http.get(this.BASEURL + '/Booking/GetAllBookingCanc', this.getAuthHeadersJSON());
  }

  getBookingCancByID(ID) {
    return this.http.get(this.BASEURL + '/Booking/GetBookingCancById?ID=' + ID, this.getAuthHeadersJSON());
  }

  AddBookingCanc(BookingCanc){
    if (BookingCanc.bookingcancid) {
      return this.http.post(this.BASEURL + '/Booking/EditBookingCanc', BookingCanc, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Booking/AddBookingCanc', BookingCanc, this.getAuthHeadersJSON());
  }

  DeleteBookingCanc(ID) {
    return this.http.get(this.BASEURL + '/Booking/DeleteBookingCanc?ID=' + ID, this.getAuthHeadersJSON());
  }

  getContractList() {
    return this.http.get(this.BASEURL + '/Contract/GetAllContract', this.getAuthHeadersJSON());
  }

  getContractByID(ID) {
    return this.http.get(this.BASEURL + '/Contract/GetContractById?ID=' + ID, this.getAuthHeadersJSON());
  }

  AddContract(Contract){
    if (Contract.contractid) {
      return this.http.post(this.BASEURL + '/Contract/EditContract', Contract, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Contract/AddContract', Contract, this.getAuthHeadersJSON());
  }

  DeleteContract(ID) {
    return this.http.get(this.BASEURL + '/Contract/DeleteContract?ID=' + ID, this.getAuthHeadersJSON());
  }

  getContractRenList() {
    return this.http.get(this.BASEURL + '/Contract/GetAllContractRen', this.getAuthHeadersJSON());
  }

  getContractRenByID(ID) {
    return this.http.get(this.BASEURL + '/Contract/GetContractRenById?ID=' + ID, this.getAuthHeadersJSON());
  }

  AddContractRen(ContractRen){
    if (ContractRen.contractrenewalid) {
      return this.http.post(this.BASEURL + '/Contract/EditContractRen', ContractRen, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Contract/AddContractRen', ContractRen, this.getAuthHeadersJSON());
  }

  DeleteContractRen(ID) {
    return this.http.get(this.BASEURL + '/Contract/DeleteContractRen?ID=' + ID, this.getAuthHeadersJSON());
  }

  getPdcList() {
    return this.http.get(this.BASEURL + '/Pdc/GetAllPdcs', this.getAuthHeadersJSON());
  }

  getPdcByID(ID) {
    return this.http.get(this.BASEURL + '/Pdc/GetPdcById?ID=' + ID, this.getAuthHeadersJSON());
  }

  AddPdc(Pdc){
    if (Pdc.pdcid) {
      return this.http.post(this.BASEURL + '/Pdc/EditPdc', Pdc, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Pdc/AddPdc', Pdc, this.getAuthHeadersJSON());
  }

  DeletePdc(ID) {
    return this.http.get(this.BASEURL + '/Pdc/DeletePdc?ID=' + ID, this.getAuthHeadersJSON());
  }

  getDisputeList() {
    return this.http.get(this.BASEURL + '/Dispute/GetAllDisputes', this.getAuthHeadersJSON());
  }

  getDisputeByID(ID) {
    return this.http.get(this.BASEURL + '/Dispute/GetDisputeById?ID=' + ID, this.getAuthHeadersJSON());
  }

  AddDispute(Dispute){
    if (Dispute.disputeid) {
      return this.http.post(this.BASEURL + '/Dispute/EditDispute', Dispute, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Dispute/AddDispute', Dispute, this.getAuthHeadersJSON());
  }

  DeleteDispute(ID) {
    return this.http.get(this.BASEURL + '/Dispute/DeleteDispute?ID=' + ID, this.getAuthHeadersJSON());
  }

  getCustTransaction() {
    return this.http.get(this.BASEURL + '/Transactions/GetAllCustomerTran', this.getAuthHeadersJSON());
  }

  getPaymentRec() {
    return this.http.get(this.BASEURL + '/PaymentRec/GetAllPaymentRec', this.getAuthHeadersJSON());
  }

  AddPaymentRec(PaymentRec){
      return this.http.post(this.BASEURL + '/PaymentRec/AddPaymentRec', PaymentRec, this.getAuthHeadersJSON());
  }
}

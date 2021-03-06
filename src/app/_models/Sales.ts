import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

export class Salesenquire {
  id: Number;
  enquireno: Number;
  customerid: Number;
  projectid: Number;
  unitid: Number;
  consultantid: Number;
  amount: Number;
  remark: String;
  status: Number
  createdby: String;
  createdon: Date;
  modifiedby: String;
  modifiedon: Date;
}

export class SalesInvoice {
  id: Number;
  invoiceno: Number;
  salesquatationid: Number;
  amount: Number;
  remark: String;
  status: Number;
  createdby: String;
  createdon: Date;
  modifiedby: String;
  modifiedon: Date;
}



export class Sales {
  salesenquireid: Number;
  salesquotationid: Number;
  salesinvoiceid: Number;
  salesenquireno: Number;
  salesquotationno: Number;
  salesinvoiceno: Number;
  customerid: Number;
  customername: String;
  projectid: Number;
  projectname: String;
  unitid: Number;
  plotno: String;
  consultantid: Number;
  consultantname: String;
  amount: Number;
  remark: String;
  status: String;
  createdby: String;
  createdon: Date;
  modifiedby: String;
  modifiedon: Date;
}

export class SalesQuotation{
  id: Number;
  quotationno: Number;
  salesenquireid: Number;
  amount: Number;
  remark: string;
  status: Number;
  createdby: string;
  createdon: Date
  modifiedby: string;
  modifiedon: Date;
}


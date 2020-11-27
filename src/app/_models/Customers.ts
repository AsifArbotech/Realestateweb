export class Customers {
  id: number;
  name: string;
  email: string;
  mobile: string;
  customerreference: string;
  consultantreference: number;
  consultantreferencename: number;
  tempaddress: string;
  permanentaddress: string;
  status: number;
  createdby: string;
  createdon: Date;
  modifiedby: string;
  modifiedon: Date;

}

export class CustomerTransaction{
  custtransactionid: Number;
  custtransactionno: Number;
  customerid: Number;
  customername: null;
  projectid: Number;
  projectname: null;
  unitid: Number;
  plotno: null;
  bookingid: Number;
  bookingno: Number;
  totalamount: Number;
  amountpaid: Number;
  balanceamount: Number;
  createdby: string;
  createdon: Date;
  modifiedby: string;
  modifiedon: Date;
}

export class Associate {
  id: number;
  name: string;
  type: string;
  email: string;
  mobile: string;
  address: string;
  status: number;
  createdby: string;
  createdon: Date;
  modifiedby: string;
  modifiedon: Date;

}

export class AssociateTransaction{
  asstransactionid: Number;
  asstransactionno: Number;
  paymentpayableid: Number;
  consultantid: Number;
  name: string;
  projectid: Number;
  projectname: null;
  unitid: Number;
  plotno: null;
  amountpaid: Number;
  percentage: Number;
  totalamount: Number;
  createdby: string;
  createdon: Date;
  modifiedby: string;
  modifiedon: Date;
}

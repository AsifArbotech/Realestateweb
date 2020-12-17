import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

export class AddBooking{
    bookingid: Number;
    bookingno: Number;
    id: Number;
    customerid: Number;
    projectid: Number;
    unitid: Number;
    consultantid: Number;
    bookingamount: Number;
    totalamount: Number;
    status: Number;
    assignto: string;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}


export class Bookings {
    bookingid: Number;    
    bookingcancid: Number; 
    bookingtransferid : Number;
    bookingno: Number;
    bookingcancno: Number;
    bookingtransferno: Number; 
    customerid: Number;
    customername: String;
    projectid: Number;
    projectname: String;
    unitid: Number;
    plotno: String;
    consultantid: Number;
    name: String;
    bookingamount: Number; 
    refundamount: Number; 
    totalamount: Number;
    oldsellingamount: Number; 
    newsellingamount: Number; 
    transferdate: Date;
    assignto: string;
    status: Number; 
    createdby: string; 
    createdon: Date; 
    modifiedby: string;  
    modifiedon: Date;
}

export class BookingCancellation{
    bookingcancid: Number;
    bookingcancno: Number;
    bookingid: Number;
    amount: Number;
    remark: string;
    status: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class BookingTransfer{
    bookingtransfid: Number;
    bookingtransfno: Number;
    bookingid: Number;
    newcustomerid: Number;
    newunitid: Number;
    newsellingprice: Number;
    transferdate: Date;
    status: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}
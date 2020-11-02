export class AddBooking{
    bookingid: Number;
    bookingno: Number;
    customerid: Number;
    projectid: Number;
    unitid: Number;
    consultantid: Number;
    amount: Number;
    status: Number;
    assignto: string;
    createdby: string;
    createdon: string;
    modifiedby: string;
    modifiedon: string;
}


export class Bookings {    
    bookingcancellationid: Number; 
    bookingtransferid : Number;
    bookingno: Number;
    bookingcancellationno: Number;
    bookingtransferno: Number; 
    customerid: Number; 
    customername: string; 
    projectid: Number; 
    projectname:string; 
    unitid: Number; 
    plotno: Number; 
    consultantid: Number; 
    consultantname: string; 
    bookingamount: Number; 
    refundamount: Number; 
    oldsellingamount: Number; 
    newsellingamount: Number; 
    status: Number; 
    createdby: Date; 
    createdon: Date; 
    modifiedby: Date;  
    modifiedon: Date;
}
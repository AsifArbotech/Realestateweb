export class PaymentRec{
    paymentrecid: Number;
    paymenttype: string;
    paymentrefno: Number;
    customerid: Number;
    projectid: Number;
    unitid: Number;
    amount: Number;
    totalamount: Number;
    remark: string;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class Payment{
    paymentrecid: Number;    
    paymenttype: Number; 
    paymentrefno : Number;
    customerid: Number;
    customername: String;
    projectid: Number;
    projectname: String;
    unitid: Number;
    plotno: String;
    amount: Number;
    totalamount: Number;
    balanceamount: Number;
    remark: string;
    createdby: string; 
    createdon: Date; 
    modifiedby: string;  
    modifiedon: Date;
}
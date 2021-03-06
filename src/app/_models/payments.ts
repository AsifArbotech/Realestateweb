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

export class PaymentPayOwner{
    paymentpayableownerid: Number;
    paymentto: string;
    ownerid: Number;
    projectid: Number;
    unitid: Number;
    amountpaid: Number;
    totalamount: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class PaymentPayAss{
    paymentpayableassid:Number;
    paymentto: string;
    consultantid: Number;
    projectid: Number;
    unitid: Number;
    amountpaid: Number;
    percentage: Number;
    totalamount: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class Payment{
    paymentrecid: Number;    
    paymentpayableid: Number;
    paymentto: Number; 
    paymentrefno : Number;
    customerid: Number;
    customername: String;
    ownerid: Number;
    ownername: string;
    id: number;
    name: string;
    projectid: Number;
    projectname: String;
    unitid: Number;
    plotno: String;
    amount: Number;
    percentage: Number;
    totalamount: Number;
    balanceamount: Number;
    remark: string;
    createdby: string; 
    createdon: Date; 
    modifiedby: string;  
    modifiedon: Date;
}
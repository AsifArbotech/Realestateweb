export class Owner{
    ownerid: number;
    ownername: string;
    ownerreference: string;
    addressid: number;
    owneraadharno: string;
    owneridproof: string;
    ownerpicture: string;
    notes: string;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class OwnerTransaction{
    ownertransid: Number;
    ownertransno: Number;
    paymentpayableid: Number;
    ownerid: Number;
    ownername: string;
    projectid: Number;
    projectname: null;
    unitid: Number;
    plotno: null;
    amountpaid: Number;
    totalamount: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}
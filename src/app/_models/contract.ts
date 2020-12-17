import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

export class AddContract {
    contractid: Number;
    contractcode: Number;
    name: string;
    startdate: Date;
    enddate: Date;
    contractdate: Date;
    noofinstallments: Number;
    unitid: Number;
    plotno: string;
    customerid: Number;
    customername: String;
    notes: string;
    status: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class ContractRenewal{
    contractrenewalid: Number;
    contractrenewalno: Number;
    contractid: Number;
    notes: string;
    renewaldate: Date;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class ContractTerminate{
    contractterminateid: Number;
    contractterminateno: Number;
    contractid: Number;
    notes: string;
    terminatedate: Date;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}

export class Contract {
    contractid: Number;
    contractcode: Number;
    contractrenewalid: Number;
    contractrenewalno: Number;
    contractterminateid: Number;
    contractterminateno: Number;
    terminatedate: Date;
    name: string;
    startdate: Date;
    enddate: Date;
    contractdate: Date;
    noofinstallments: Number;
    unitid: Number;
    plotno: string;
    ownerid: Number;
    ownername: string;
    customerid: Number;
    customername: String;
    notes: string;
    status: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}
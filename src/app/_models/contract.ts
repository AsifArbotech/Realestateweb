import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

export class AddContract {
    CONTRACTID: Number;
    CONTRACTCODE: Number;
    NAME: string;
    STARTDATE: Date;
    ENDDATE: Date;
    CONTRACTDATE: Date;
    NOOFINSTALLMENTS: Number;
    UNITID: Number;
    PLOTNO: string;
    OWNERID: Number;
    OWNERNAME: string;
    NOTES: string;
    STATUS: Number;
    CREATEDBY: string;
    CREATEDON: Date;
    MODIFIEDBY: string;
    MODIFIEDON: Date;
}

export class ContractRenewal{
    contractid: Number;
    contractrenewalid: Number;
    contractrenewalno: Number;
    notes: string;
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
    name: string;
    startdate: Date;
    enddate: Date;
    contractdate: Date;
    noofinstallments: Number;
    unitid: Number;
    plotno: string;
    ownerid: Number;
    ownername: string;
    notes: string;
    status: Number;
    createdby: string;
    createdon: Date;
    modifiedby: string;
    modifiedon: Date;
}
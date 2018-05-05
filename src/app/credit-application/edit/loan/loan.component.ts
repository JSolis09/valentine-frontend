import { Component, OnInit } from '@angular/core';

import { Schedule } from '../../credit-application.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit {
  public displayedColumns: string[];
  public dataSource = SCHEDULE_DATA;

  constructor() {
    this.displayedColumns = Object.keys(this.dataSource[0]);
    this.displayedColumns.unshift('index');
  }

  ngOnInit() { }

}

const SCHEDULE_DATA: Schedule[] = [
  {
    amount: 82.34,
    expiryDate: new Date(),
    status: 'Pago',
    fee: null,
    interest: null,
    expense: null,
    payment: 82.34,
    paymentDate: new Date(),
    arrears: 0,
    debt: null,
  },
  {
    amount: 82.34,
    expiryDate: new Date(),
    status: 'Pago',
    fee: null,
    interest: null,
    expense: null,
    payment: 82.34,
    paymentDate: new Date(),
    arrears: 0,
    debt: null,
  },
  {
    amount: 82.34,
    expiryDate: new Date(),
    status: 'Pago',
    fee: null,
    interest: null,
    expense: null,
    payment: 82.34,
    paymentDate: new Date(),
    arrears: 0,
    debt: null,
  },
  {
    amount: 82.34,
    expiryDate: new Date(),
    status: 'Pago',
    fee: null,
    interest: null,
    expense: null,
    payment: 82.34,
    paymentDate: new Date(),
    arrears: 0,
    debt: null,
  },
  {
    amount: 82.34,
    expiryDate: new Date(),
    status: 'Pago',
    fee: null,
    interest: null,
    expense: null,
    payment: 82.34,
    paymentDate: new Date(),
    arrears: 0,
    debt: null,
  },
  {
    amount: 82.34,
    expiryDate: new Date(),
    status: 'Pago',
    fee: null,
    interest: null,
    expense: null,
    payment: 82.34,
    paymentDate: new Date(),
    arrears: 0,
    debt: null,
  },
];

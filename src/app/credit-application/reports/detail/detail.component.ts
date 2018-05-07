import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DetailProfitability } from '../../credit-application.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public period: string;
  public dataSource: DetailProfitability[];
  public displayedColumns: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.dataSource = DATA;
    this.displayedColumns = Object.keys(this.dataSource[0]);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.period = params['id'];
    });
  }

}

const DATA: DetailProfitability[] = [
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
  {
    loanFee: 'VL-3432',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: '2/12',
    expiredDate: new Date(),
    status: 'Estado',
    amount: 23,
    rate: 25,
  },
];


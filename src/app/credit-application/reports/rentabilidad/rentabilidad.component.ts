import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profitability } from '../../credit-application.model';

@Component({
  selector: 'app-rentabilidad',
  templateUrl: './rentabilidad.component.html',
  styleUrls: ['./rentabilidad.component.css'],
})
export class RentabilidadComponent implements OnInit {
  public dataSource: Profitability[];
  public displayedColumns: string[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource = DATA;
    this.displayedColumns = Object.keys(this.dataSource[0]);
    this.displayedColumns.push('detail');
  }

  goDetail(profitability: Profitability): void {
    this.router
      .navigate(['credit-application/report/detail', profitability.period]);
  }

}

const DATA: Profitability[] = [
  {
    period: 'Marzo 2018',
    capital: 20000,
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: 11,
  },
  {
    capital: 20000,
    period: 'Marzo 2018',
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: 11,
  },
  {
    capital: 20000,
    period: 'Marzo 2018',
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: 11,
  },
  {
    capital: 20000,
    period: 'Marzo 2018',
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: 11,
  },
  {
    capital: 20000,
    period: 'Marzo 2018',
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: 11,
  },
  {
    capital: 20000,
    period: 'Marzo 2018',
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: 11,
  },
  {
    capital: 20000,
    period: 'Marzo 2018',
    interest: 38,
    mora: 0,
    commission: -2,
    repayment: 56,
    fee: 11,
  },
];

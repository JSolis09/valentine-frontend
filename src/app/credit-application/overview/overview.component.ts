import { Component, OnInit } from '@angular/core';
import { CreditApplication } from '../credit-application.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  public displayedColumns: string[];
  public dataSource = APPLICATION_DATA;
  constructor() {
    this.displayedColumns = Object.keys(this.dataSource[0]);
    this.displayedColumns.push('operations');
    console.log(this.displayedColumns);
  }

  ngOnInit() {}

}

const APPLICATION_DATA: CreditApplication[] = [
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
  {
    code: 'VL-5678',
    name: 'Juan Perez',
    dni: '45126578',
    amount: 20000,
    date: new Date(),
    period: 12,
    status: 'Formalizado',
    penTea: '25%',
    finalTea: '25%',
  },
];

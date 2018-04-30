import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditApplication } from '../credit-application.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  public displayedColumns: string[];
  public dataSource = APPLICATION_DATA;
  constructor(private router: Router) {
    this.displayedColumns = Object.keys(this.dataSource[0]);
    this.displayedColumns.push('operations');
    console.log(this.displayedColumns);
  }

  ngOnInit() {}

  public goEdit(application: CreditApplication): void {
    this.router.navigate(['credit-application/edit', application.code, 'general']);
  }

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

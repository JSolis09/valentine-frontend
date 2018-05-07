import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profitability } from '../../credit-application.model';
import { CreditApplicationService } from '../../credit-application.service';

@Component({
  selector: 'app-rentabilidad',
  templateUrl: './rentabilidad.component.html',
  styleUrls: ['./rentabilidad.component.css'],
})
export class RentabilidadComponent implements OnInit {
  public dataSource: Profitability[];
  public displayedColumns: string[];
  public inversor: string;
  public showReport: boolean;
  public btnDisabled: boolean;

  constructor(private creditApplicationService: CreditApplicationService,
              private router: Router) { }

  ngOnInit() {}

  goDetail(profitability: Profitability): void {
    const periodArray = profitability.period.split(' ');
    const year = periodArray[1];
    const month = this.creditApplicationService.getCodeByMonthName(periodArray[0]);
    this.router
      .navigate(['credit-application/report/detail', this.inversor, month, year]);
  }

  search(): void {
    this.showReport = false;
    this.btnDisabled = true;
    this.creditApplicationService
      .getProfitabilityReport(this.inversor)
      .subscribe((response) => {
        this.dataSource = response;
        this.displayedColumns = Object.keys(this.dataSource[0]);
        this.displayedColumns.push('detail');
        this.showReport = true;
        this.btnDisabled = false;
      });
  }

}

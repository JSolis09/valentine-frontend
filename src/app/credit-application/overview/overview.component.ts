import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditApplication, CreditApplicationDTO, Parameter, SearchCreditApplicationDTO } from '../credit-application.model';
import { CreditApplicationService } from '../credit-application.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  public displayedColumns: string[];
  public dataSource: CreditApplication[];
  public statusList: Parameter[];
  public creditDestinationList: Parameter[];
  public solicitud: SearchCreditApplicationDTO = new SearchCreditApplicationDTO();

  constructor(private router: Router,
              private creditApplicationService: CreditApplicationService) {
    this.displayedColumns = [];
    this.dataSource = [];
  }

  ngOnInit() {
    this.creditApplicationService
      .getAllStatusCreditApplication()
      .subscribe((response) => {
        this.statusList = response;
      });
    this.creditApplicationService
      .getAllCreditDestination()
      .subscribe((response) => {
        this.creditDestinationList = response;
      });
    this.search();
  }

  public goEdit(application: CreditApplication): void {
    this.router
        .navigate(['credit-application/edit', application.code, 'general']);
  }

  public search(): void {
    console.log(this.solicitud);
    this.creditApplicationService
      .getCreditApplication(this.solicitud)
      .subscribe((response: CreditApplication[]) => {
        this.dataSource = response;
        this.displayedColumns = Object.keys(this.dataSource[0]);
        this.displayedColumns.push('operations');
        console.log(response);
      });
  }

}

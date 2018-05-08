import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResponse, CreditApplication, CreditApplicationDTO,
         Parameter, SearchCreditApplicationDTO } from '../credit-application.model';
import { CreditApplicationService } from '../credit-application.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  public creditDestinationList: Parameter[];
  public dataSource: CreditApplication[];
  public displayedColumns: string[];
  public currentPage: number =  1;
  public numPages: number[] = [];
  public pageSize: number = 10;
  public total: number;
  public solicitud: SearchCreditApplicationDTO = new SearchCreditApplicationDTO();
  public statusList: Parameter[];

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
    this.search(this.currentPage);
  }

  public goEdit(application: CreditApplication): void {
    this.router
        .navigate(['credit-application/edit', application.code, 'general']);
  }

  public search(currentPage: number = 1): void {
    this.currentPage = currentPage;
    this.solicitud.Paginacion.Page = currentPage;
    this.solicitud.Paginacion.PageSize = this.pageSize;
    this.creditApplicationService
      .getCreditApplication(this.solicitud)
      .subscribe((response: BaseResponse<CreditApplication>) => {
        this.dataSource = response.data;
        this.displayedColumns = Object.keys(this.dataSource[0]);
        this.displayedColumns.push('operations');
        this.total = response.total;
        this.numPages = this.calculateNumPages(this.total, this.pageSize);
      });
  }

  private calculateNumPages(total: number, size: number): number[] {
    const numPages = Math.ceil(total / size);
    const pages = [];
    for (let i = 0; i < numPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BaseResponse, DetailProfitability, DetailProfitabilityRequest } from '../../credit-application.model';
import { CreditApplicationService } from '../../credit-application.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  public detailRequest: DetailProfitabilityRequest = new DetailProfitabilityRequest();
  public dataSource: DetailProfitability[];
  public displayedColumns: string[];
  public currentPage: number =  1;
  public numPages: number[] = [];
  public pageSize: number = 10;
  public total: number;

  constructor(private activatedRoute: ActivatedRoute,
              private creditApplicationService: CreditApplicationService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.detailRequest.CodigoInversor = params['inversorId'];
      this.detailRequest.Anio = params['anio'];
      this.detailRequest.Mes = params['month'];
      console.log(this.detailRequest);
      this.getProfitabilityDetailReport(this.currentPage);
    });
  }

  public getProfitabilityDetailReport(currentPage: number = 1): void {
    this.currentPage = currentPage;
    this.detailRequest.Paginacion.Page = currentPage;
    this.detailRequest.Paginacion.PageSize = this.pageSize;
    this.creditApplicationService
    .getProfitabilityDetailReport(this.detailRequest)
    .subscribe((response) => {
      this.dataSource = response.data;
      this.displayedColumns = Object.keys(this.dataSource[0] || {});
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

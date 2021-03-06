import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreditApplicationRoutes } from './credit-application.route';
import { EditModule } from './edit/edit.module';
import { OverviewModule } from './overview/overview.module';
import { ReportsModule } from './reports/reports.module';

@NgModule({
  imports: [
    CommonModule,
    EditModule,
    OverviewModule,
    ReportsModule,
    RouterModule.forChild(CreditApplicationRoutes),
  ],
  declarations: [],
})
export class CreditApplicationModule { }

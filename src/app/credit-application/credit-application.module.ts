import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreditApplicationRoutes } from './credit-application.route';
import { OverviewModule } from './overview/overview.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewModule,
    RouterModule.forChild(CreditApplicationRoutes),
  ],
  declarations: [],
})
export class CreditApplicationModule { }

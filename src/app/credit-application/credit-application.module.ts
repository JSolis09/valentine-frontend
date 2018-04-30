import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreditApplicationRoutes } from './credit-application.route';
import { EditModule } from './edit/edit.module';
import { OverviewModule } from './overview/overview.module';

@NgModule({
  imports: [
    CommonModule,
    EditModule,
    OverviewModule,
    RouterModule.forChild(CreditApplicationRoutes),
  ],
  declarations: [],
})
export class CreditApplicationModule { }

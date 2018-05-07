import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetailModule } from './detail/detail.module';
import { RentabilidadModule } from './rentabilidad/rentabilidad.module';
import { ReportsRoutes } from './reports.route';

@NgModule({
  imports: [
    CommonModule,
    DetailModule,
    RentabilidadModule,
    RouterModule.forChild(ReportsRoutes),
  ],
  declarations: [],
})
export class ReportsModule { }

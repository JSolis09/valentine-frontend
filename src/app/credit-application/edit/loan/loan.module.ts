import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';
import { LoanComponent } from './loan.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [LoanComponent],
})
export class LoanModule { }

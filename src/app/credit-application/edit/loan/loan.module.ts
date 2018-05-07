import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material/material.module';
import { LoanComponent } from './loan.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [LoanComponent],
})
export class LoanModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material/material.module';
import { EvaluationComponent } from './evaluation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [EvaluationComponent],
})
export class EvaluationModule { }

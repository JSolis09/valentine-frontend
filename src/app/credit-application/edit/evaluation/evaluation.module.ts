import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';
import { EvaluationComponent } from './evaluation.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [EvaluationComponent],
})
export class EvaluationModule { }

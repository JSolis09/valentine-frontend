import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';
import { GeneralComponent } from './general.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [GeneralComponent],
})
export class GeneralModule { }

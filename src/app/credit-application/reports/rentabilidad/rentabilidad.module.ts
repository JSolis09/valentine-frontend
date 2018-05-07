import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';
import { RentabilidadComponent } from './rentabilidad.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [RentabilidadComponent],
})
export class RentabilidadModule { }

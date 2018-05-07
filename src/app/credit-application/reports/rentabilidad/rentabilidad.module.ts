import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '../../../shared/material/material.module';
import { CreditApplicationService } from '../../credit-application.service';
import { RentabilidadComponent } from './rentabilidad.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [RentabilidadComponent],
  providers: [ CreditApplicationService ],
})
export class RentabilidadModule { }

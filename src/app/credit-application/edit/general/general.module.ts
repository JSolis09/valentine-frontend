import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { MaterialModule } from '../../../shared/material/material.module';
import { CreditApplicationService } from '../../credit-application.service';
import { GeneralComponent } from './general.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [ GeneralComponent ],
  providers: [ CreditApplicationService ],
})
export class GeneralModule { }

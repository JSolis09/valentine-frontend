import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material/material.module';
import { CreditApplicationService } from '../../credit-application.service';
import { ApplicationComponent } from './application.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [ApplicationComponent],
  providers: [ CreditApplicationService ],
})
export class ApplicationModule { }

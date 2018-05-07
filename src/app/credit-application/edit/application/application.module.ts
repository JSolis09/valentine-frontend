import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';
import { CreditApplicationService } from '../../credit-application.service';
import { ApplicationComponent } from './application.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [ApplicationComponent],
  providers: [ CreditApplicationService ],
})
export class ApplicationModule { }

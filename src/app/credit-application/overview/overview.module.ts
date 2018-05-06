import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';

import { CreditApplicationService } from '../credit-application.service';
import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
  ],
  declarations: [ OverviewComponent ],
  providers: [ CreditApplicationService ],
})
export class OverviewModule { }

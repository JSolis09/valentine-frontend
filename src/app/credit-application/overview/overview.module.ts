import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [ MaterialModule ],
  declarations: [OverviewComponent],
})
export class OverviewModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';
import { ApplicationComponent } from './application.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [ApplicationComponent],
})
export class ApplicationModule { }

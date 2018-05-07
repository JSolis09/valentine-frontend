import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '../../../shared/material/material.module';
import { DetailComponent } from './detail.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [DetailComponent],
})
export class DetailModule { }

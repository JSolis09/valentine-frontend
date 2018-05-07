import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '../app/shared/shared.module';
import { ReportComponent } from './report/report.component';
import { ReportSubastaRoutingModule } from './reportSubasta.routing';

@NgModule({
    declarations: [
        ReportComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        ReportSubastaRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ],
})

export class ReportSubastaModule {

}

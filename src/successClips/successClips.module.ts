import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '../app/shared/shared.module';
import { SucessClipsRoutingModule } from './successClips.routing';
import { SuccessClipsComponent } from './successClips.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
    declarations: [
        SuccessComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        SucessClipsRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ]
})

export class SuccessClipsModule {

}

import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '../app/shared/shared.module';
import { NotSucessClipsRoutingModule } from './notSuccessClips.routing';
import { NotSuccessClipsComponent } from './notSuccessClips.component';
import { NotSuccessComponent } from './notSuccess/notSuccess.component';

@NgModule({
    declarations: [
        NotSuccessComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        NotSucessClipsRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ]
})

export class NotSuccessClipsModule {

}

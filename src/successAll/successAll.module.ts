import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '../app/shared/shared.module';
import { SucessAllRoutingModule } from './successAll.routing';
import { SuccessAllComponent } from './successAll.component';
import { SuccessAllRegisterComponent } from './successAllRegister/successAllRegister.component';

@NgModule({
    declarations: [
        SuccessAllRegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        SucessAllRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ]
})

export class SuccessAllModule {

}

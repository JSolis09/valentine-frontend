import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '../app/shared/shared.module';
import { RegisterSecondStepAddComponent } from './registerSecondStep-add/registerSecondStep-add.component';
import { RegisterSecondStepRoutingModule } from './registerSecondStep.routing';

@NgModule({
    declarations: [
        RegisterSecondStepAddComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        RegisterSecondStepRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ],
})

export class RegisterSecondStepModule {

}

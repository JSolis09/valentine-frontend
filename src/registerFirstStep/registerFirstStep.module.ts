import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '../app/shared/shared.module';
import { RegisterFirstStepAddComponent } from './registerFirstStep-add/registerFirstStep-add.component';
import { RegisterFirstStepRoutingModule } from './registerFirstStep.routing';

@NgModule({
    declarations: [
        RegisterFirstStepAddComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        RegisterFirstStepRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ],
})

export class RegisterFirstStepModule {

}

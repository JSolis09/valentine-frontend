import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentModule } from '../app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        HomeRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
    ],
})

export class HomeModule {

}

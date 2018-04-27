import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';


import { ArchivoService, ClipsService, HttpService, LocalStoreManager, ParametroService, SolicitudCreditoService, UbigeoService, SubastaService } from '../app/services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedComponentModule } from './shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedComponentModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
        ArchivoService,
        ClipsService,
        HttpService,
        ParametroService,
        SolicitudCreditoService,
        UbigeoService,
        LocalStoreManager,
        SubastaService
    ],
})
export class AppModule { }

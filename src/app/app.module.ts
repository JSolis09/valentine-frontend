import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArchivoService, ClipsService, HttpService, LocalStoreManager, ParametroService, SolicitudCreditoService, UbigeoService, SubastaService } from '../app/services';
import { CreditApplicationModule } from './credit-application/credit-application.module';
import { SharedComponentModule } from './shared/shared.module';
import { ParticipacionesComponent } from './auth/reportes/participaciones/participaciones.component';

@NgModule({
  imports: [
    CreditApplicationModule,
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
    ParticipacionesComponent,
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

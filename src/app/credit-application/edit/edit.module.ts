import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';

import { MaterialModule } from '../../shared/material/material.module';
import { CreditApplicationService } from '../credit-application.service';
import { ApplicationModule } from './application/application.module';
import { EditComponent } from './edit.component';
import { EditRoutes } from './edit.route';
import { EvaluationModule } from './evaluation/evaluation.module';
import { GeneralModule } from './general/general.module';
import { LoanModule } from './loan/loan.module';


@NgModule({
  imports: [
    ApplicationModule,
    FormsModule,
    GeneralModule,
    MaterialModule,
    ModalModule.forRoot(),
    RouterModule.forChild(EditRoutes),
    EvaluationModule,
    LoanModule,
  ],
  declarations: [ EditComponent ],
  providers: [ CreditApplicationService ],
})
export class EditModule { }

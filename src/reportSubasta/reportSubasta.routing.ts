import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';

const reportSubastaRoutes: Routes = [
    {
        path: '',
        component: ReportComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'report',
    },
];

@NgModule({
    imports: [ RouterModule.forChild(reportSubastaRoutes) ],
    exports: [ RouterModule ],
})

export class ReportSubastaRoutingModule { }

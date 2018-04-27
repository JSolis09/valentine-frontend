import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessClipsComponent } from './successClips.component';
import { SuccessComponent } from './success/success.component';

const successClipsRoutes: Routes = [
    {
        path: '',
        component: SuccessComponent,
    },
    {
        path: ':Id',
        component: SuccessComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'sucessClips',
    },
];

@NgModule({
    imports: [ RouterModule.forChild(successClipsRoutes) ],
    exports: [ RouterModule ],
})

export class SucessClipsRoutingModule { }

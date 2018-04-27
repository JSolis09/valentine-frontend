import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotSuccessClipsComponent } from './notSuccessClips.component';
import { NotSuccessComponent } from './notSuccess/notSuccess.component';

const notSuccessClipsRoutes: Routes = [
    {
        path: '',
        component: NotSuccessComponent,
    },
    {
        path: ':Id',
        component: NotSuccessComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'notSuccessClips',
    },
];

@NgModule({
    imports: [ RouterModule.forChild(notSuccessClipsRoutes) ],
    exports: [ RouterModule ],
})

export class NotSucessClipsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'registerFirstStep',
        loadChildren: './../registerFirstStep/registerFirstStep.module#RegisterFirstStepModule',
    },
    {
        path: 'registerSecondStep',
        loadChildren: './../registerSecondStep/registerSecondStep.module#RegisterSecondStepModule'
    },
    {
        path: 'successClips',
        loadChildren: './../successClips/successClips.module#SuccessClipsModule'
    },
    {
        path: 'notSuccessClips',
        loadChildren: './../notSuccessClips/notSuccessClips.module#NotSuccessClipsModule'
    },
    {
        path: 'successAll',
        loadChildren: './../successAll/successAll.module#SuccessAllModule'
    },
    {
        path: 'home',
        loadChildren: './../home/home.module#HomeModule'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class AppRoutingModule { }

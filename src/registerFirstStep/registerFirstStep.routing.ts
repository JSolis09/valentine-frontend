import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFirstStepAddComponent } from './registerFirstStep-add/registerFirstStep-add.component';

const registerFirstStepRoutes: Routes = [
    {
        path: '',
        component: RegisterFirstStepAddComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'registerFirstStep',
    },
];

@NgModule({
    imports: [ RouterModule.forChild(registerFirstStepRoutes) ],
    exports: [ RouterModule ],
})

export class RegisterFirstStepRoutingModule { }

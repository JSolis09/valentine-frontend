import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessAllComponent } from './successAll.component';
import { SuccessAllRegisterComponent } from './successAllRegister/successAllRegister.component';

const successAllRoutes: Routes = [
    {
        path: '',
        component: SuccessAllRegisterComponent,
    },
    {
        path: ':Id',
        component: SuccessAllRegisterComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'sucessAll',
    },
];

@NgModule({
    imports: [ RouterModule.forChild(successAllRoutes) ],
    exports: [ RouterModule ],
})

export class SucessAllRoutingModule { }

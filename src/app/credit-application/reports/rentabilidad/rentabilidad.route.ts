import { Routes } from '@angular/router';
import { RentabilidadComponent } from './rentabilidad.component';

export const RentabilidadRoutes: Routes = [
  {
      path: 'rentabilidad',
      component: RentabilidadComponent,
  },
  {
    path: '',
    redirectTo: 'rentabilidad',
    pathMatch: 'full',
  },
];

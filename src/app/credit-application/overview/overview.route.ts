import { Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';

export const OverviewRoutes: Routes = [
  {
      path: 'overview',
      component: OverviewComponent,
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
];

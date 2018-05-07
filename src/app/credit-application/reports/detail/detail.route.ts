import { Routes } from '@angular/router';
import { DetailComponent } from './detail.component';

export const DetailRoutes: Routes = [
  {
      path: 'detail/:inversorId/:month/:anio',
      component: DetailComponent,
  },
];

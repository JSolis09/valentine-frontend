import { Routes } from '@angular/router';

import { DetailRoutes } from './detail/detail.route';
import { RentabilidadRoutes } from './rentabilidad/rentabilidad.route';

export const ReportsRoutes: Routes = [
  {
      path: 'report',
      children: [
        ...RentabilidadRoutes,
        ...DetailRoutes,
      ],
  },
];

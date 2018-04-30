import { Routes } from '@angular/router';
import { OverviewRoutes } from './overview/overview.route';
import { EditRoutes } from './edit/edit.route';

export const CreditApplicationRoutes: Routes = [
  {
      path: 'credit-application',
      children: [
        ...OverviewRoutes,
        ...EditRoutes,
      ],
  },
];

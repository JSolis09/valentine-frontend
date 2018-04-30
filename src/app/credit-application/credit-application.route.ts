import { Routes } from '@angular/router';
import { OverviewRoutes } from './overview/overview.route';

export const CreditApplicationRoutes: Routes = [
  {
      path: 'credit-application',
      children: [
        ...OverviewRoutes,
      ],
  },
];

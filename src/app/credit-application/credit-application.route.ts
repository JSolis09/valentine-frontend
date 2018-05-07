import { Routes } from '@angular/router';


import { EditRoutes } from './edit/edit.route';
import { OverviewRoutes } from './overview/overview.route';
import { ReportsRoutes } from './reports/reports.route';

export const CreditApplicationRoutes: Routes = [
  {
    path: 'credit-application',
    children: [
      ...EditRoutes,
      ...OverviewRoutes,
      ...ReportsRoutes,
    ],
  },
];

import { Routes } from '@angular/router';

import { ApplicationRoutes } from './application/application.route';
import { EditComponent } from './edit.component';
import { EvaluationRoutes } from './evaluation/evaluation.route';
import { GeneralRoutes } from './general/general.route';
import { LoanRoutes } from './loan/loan.route';

export const EditRoutes: Routes = [
  {
      path: 'edit/:id',
      component: EditComponent,
      children: [
        ...ApplicationRoutes,
        ...GeneralRoutes,
        ...EvaluationRoutes,
        ...LoanRoutes,
      ],
  },
];

import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';

export const full_content: Routes = [
  {
    path: 'postcheck',
    loadChildren: () =>
      import('../../components/post-check/post-check.module').then(
        (m) => m.PostCheckModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('../../components/tables/tables.module').then(
        (m) => m.TablesModule
      ),
    canActivate: [AuthGuard],
  },
];

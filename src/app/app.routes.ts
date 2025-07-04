import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'tasks-manager',
    loadChildren: () =>
      import(
        './features/tasks/components/task-manager/task-manager.routes'
      ).then(m => m.routes),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/components/login.routes').then(m => m.routes),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

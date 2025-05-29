import { Routes } from '@angular/router';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';
import { AuthGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: 'tasks-manager',
    loadChildren: () =>
      import('./tasks/components/task-manager.routes').then(m => m.routes),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/components/login.routes').then(m => m.routes),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

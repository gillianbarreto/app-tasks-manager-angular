import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '@core/components/not-found/not-found.component';
import { AuthGuard } from '@guards';

const routes: Routes = [
  {
    path: 'tasks-manager',
    loadChildren: () =>
      import('./tasks/components/task-manager/task-manager.module').then(
        m => m.TaskManagerModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/components/login.module').then(m => m.LoginModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

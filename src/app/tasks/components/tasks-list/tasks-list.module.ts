import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksListComponent } from './tasks-list.component';
import { SharedModule } from '@common/components/shared.module';

@NgModule({
  declarations: [TasksListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TasksListComponent],
  providers: [],
})
export class TasksListModule { }

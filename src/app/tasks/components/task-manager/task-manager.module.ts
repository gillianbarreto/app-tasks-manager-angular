import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerComponent } from './task-manager.component';
import { HistoryRoutingModule } from '../task-manager.routing.module';
import { SharedModule } from '@common/components/shared.module';
import { TasksListModule } from '../tasks-list';

@NgModule({
  declarations: [TaskManagerComponent],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    TasksListModule
  ],
  exports: [],
  providers: [],
})
export class TaskManagerModule { }

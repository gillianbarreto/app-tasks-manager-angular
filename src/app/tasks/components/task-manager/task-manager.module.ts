import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerComponent } from './task-manager.component';
import { TaskManagerRoutingModule } from '../task-manager.routing.module';
import { SharedModule } from '@common';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@NgModule({
  declarations: [TaskManagerComponent],
  imports: [
    CommonModule,
    SharedModule,
    TaskManagerRoutingModule,
    TasksListComponent,
    EditTaskComponent,
  ],
})
export class TaskManagerModule {}

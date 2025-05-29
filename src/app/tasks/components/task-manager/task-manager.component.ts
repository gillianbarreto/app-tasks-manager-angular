import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { TasksHelper } from '../../services/tasks.helper';
import { TASK_TITLE } from '../../content';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { FooterComponent } from '../../../common/components/footer/footer.component';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { HeaderComponent } from '../../../common/components/header/header.component';

@Component({
  selector: 'app-task',
  templateUrl: './task-manager.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    EditTaskComponent,
    TasksListComponent,
    NgIf,
  ],
})
export class TaskManagerComponent {
  public taskId!: string | null;
  public modalTitle = '';
  public taskListTitle = TASK_TITLE.taskList;

  public tasksHelper = inject(TasksHelper);

  public onAddTask(): void {
    this.tasksHelper.showModal.set(true);
    this.taskId = null;
    this.modalTitle = TASK_TITLE.addTask;
  }

  public onEditTask(taskId: string): void {
    this.tasksHelper.showModal.set(true);
    this.taskId = taskId;
    this.modalTitle = TASK_TITLE.editTask;
  }
}

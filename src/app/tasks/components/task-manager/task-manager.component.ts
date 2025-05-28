import { Component, inject } from '@angular/core';

import { TasksHelper } from '../../services/tasks.helper';
import { TASK_TITLE } from '../../content';

@Component({
  selector: 'app-task',
  templateUrl: './task-manager.component.html',
})
export class TaskManagerComponent {
  public taskId!: string | null;
  public modalTitle = '';
  public taskListTitle = TASK_TITLE.taskList;

  public tasksHelper = inject(TasksHelper);

  public onAddTask(): void {
    this.tasksHelper.showModal = true;
    this.taskId = null;
    this.modalTitle = TASK_TITLE.addTask;
  }

  public onEditTask(taskId: string): void {
    this.tasksHelper.showModal = true;
    this.taskId = taskId;
    this.modalTitle = TASK_TITLE.editTask;
  }
}

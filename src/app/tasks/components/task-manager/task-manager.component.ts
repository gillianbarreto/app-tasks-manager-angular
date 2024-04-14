import { Component, inject } from '@angular/core';
import { TasksHelper } from '../../services/tasks.helper';

@Component({
  selector: 'app-task',
  templateUrl: './task-manager.component.html'
})
export class TaskManagerComponent {

  public taskId!: string | null;
  public titleModal: string = "";

  public tasksHelper = inject(TasksHelper);

  addTask() {
    this.tasksHelper.showModal = true;
    this.taskId = null;
    this.titleModal = "Añadir Tarea";
  }

  editTask(taskId: string) {
    this.tasksHelper.showModal = true;
    this.taskId = taskId;
    this.titleModal = "Editar Tarea";
  }

}

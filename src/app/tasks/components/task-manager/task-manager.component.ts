import { Component, inject } from '@angular/core';
import { TasksHelper } from '../../services/tasks.helper';

@Component({
  selector: 'app-task',
  templateUrl: './task-manager.component.html'
})
export class TaskManagerComponent {

  public taskId!: number | null;
  public titleModal: string = "";

  public tasksHelper = inject(TasksHelper);

  addTask() {
    this.tasksHelper.showModal = true;
    this.taskId = null;
    this.titleModal = "Añadir Tarea";
  }

  editTask(id: number) {
    this.tasksHelper.showModal = true;
    this.taskId = id;
    this.titleModal = "Editar Tarea";
  }

}

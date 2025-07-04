import { Injectable, inject, signal } from '@angular/core';

import { Task } from '../models/task';
import { TasksService } from './tasks.service';
import { SessionService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class TasksHelper {
  public showModal = signal(false);
  public showConfirmModal = signal(false);
  public tasksList = signal<Task[]>([]);

  private _selectedTaskId = '';
  private _allCompleted = false;
  private _tasksService = inject(TasksService);
  private _sessionService = inject(SessionService);

  get selectedTaskId(): string {
    return this._selectedTaskId;
  }

  set selectedTaskId(idTask: string) {
    this._selectedTaskId = idTask;
  }

  get allCompleted(): boolean {
    return this._allCompleted;
  }

  set allCompleted(allCompleted: boolean) {
    this._allCompleted = allCompleted;
  }

  getTaskById(taskId: string | null): Task {
    if (!taskId) return this.initTask();
    const task = this.tasksList().find(task => task.id == taskId);
    if (!task) return this.initTask();
    return task;
  }

  initTask(): Task {
    return {
      id: '0',
      title: '',
      description: '',
      completed: false,
      userId: '0',
    };
  }

  getTasksList() {
    this.tasksList.set([]);
    const userId = this._sessionService.getUserID();
    this._tasksService.getTasksList(userId).subscribe(response => {
      this.tasksList.set(response);
      this.setAllCompletedTask();
    });
  }

  setAllCompletedTask() {
    this._allCompleted =
      this.tasksList().findIndex(task => task.completed == false) < 0;
  }

  completedAll() {
    this.tasksList.set(
      this.tasksList().map(task => {
        task.completed = this._allCompleted;
        this._tasksService.editTask(task.id, task).subscribe();
        return task;
      }),
    );
  }

  completeTask(task: Task) {
    this._tasksService.editTask(task.id, task).subscribe(() => {
      if (!task.completed) {
        this._allCompleted = false;
      } else if (!this._allCompleted) {
        this.setAllCompletedTask();
      }
    });
  }

  saveTask(taskId: string | null, title: string, description: string) {
    if (taskId) this.updateTask(taskId, title, description);
    else this.createTask(title, description);
  }

  createTask(title: string, description: string) {
    const last = this.tasksList()[this.tasksList().length - 1];
    const id = (parseInt(last!.id, 10) + 1).toString();
    const data: Task = {
      id,
      title,
      description,
      completed: false,
      userId: this._sessionService.getUserID(),
    };

    this._tasksService.addTask(data).subscribe(response => {
      this.tasksList.update(tasks => [
        ...tasks,
        response,
      ]);
    });
  }

  updateTask(taskId: string, title: string, description: string) {
    const index = this.tasksList().findIndex(task => task.id == taskId);
    if (index >= 0) {
      const data = this.tasksList()[index];
      data.title = title;
      data.description = description;
      this._tasksService.editTask(taskId, data).subscribe(updatedData => {
        this.tasksList()[index] = updatedData;
      });
    }
  }

  deleteTask() {
    this._tasksService.deleteTask(this.selectedTaskId).subscribe(() => {
      this.tasksList.set(
        this.tasksList().filter(task => task.id !== this.selectedTaskId),
      );
    });
  }
}

import { Injectable, inject } from '@angular/core';

import { Task } from '../models/task';
import { TasksService } from './tasks.service';
import { SessionService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class TasksHelper {
  public showModal: boolean = false;
  public showConfirmModal: boolean = false;
  private _tasksList: Task[] = [];
  private _selectedTaskId: string = "";
  private _allCompleted: boolean = false;
  private _tasksService = inject(TasksService);
  private _sessionService = inject(SessionService);

  get selectedTaskId(): string {
    return this._selectedTaskId;
  }

  set selectedTaskId(idTask: string) {
    this._selectedTaskId = idTask;
  }

  get tasksList(): Task[] {
    return this._tasksList;
  }

  set tasksList(tasksList: Task[]) {
    this._tasksList = tasksList;
  }

  get allCompleted(): boolean {
    return this._allCompleted;
  }

  set allCompleted(allCompleted: boolean) {
    this._allCompleted = allCompleted;
  }

  getTaskById(taskId: string | null): Task {
    if (!taskId) return this.initTask();
    const task = this._tasksList.find((task) => task.id == taskId);
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
    this._tasksList = [];
    const userId = this._sessionService.getUserID();
    this._tasksService.getTasksList(userId).subscribe((response) => {
      this.tasksList = response;
      this.setAllCompletedTask();
    });
  }

  setAllCompletedTask() {
    this._allCompleted =
      this._tasksList.findIndex((task) => task.completed == false) < 0;
  }

  completedAll() {
    this._tasksList = this._tasksList.map((task) => {
      task.completed = this._allCompleted;
      this._tasksService.editTask(task.id, task).subscribe();
      return task;
    });
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
    const last = this._tasksList[this._tasksList.length - 1];
    const id: string = (parseInt(last!.id, 10) + 1).toString();
    const data: Task = {
      id,
      title,
      description,
      completed: false,
      userId: this._sessionService.getUserID(),
    };

    this._tasksService.addTask(data).subscribe((response) => {
      this._tasksList.push(response);
    });
  }

  updateTask(taskId: string, title: string, description: string) {
    const index = this._tasksList.findIndex((task) => task.id == taskId);
    if (index > 0) {
      const data = this._tasksList[index];
      data.title = title;
      data.description = description;
      this._tasksService.editTask(taskId, data).subscribe((response) => {
        this._tasksList[index] = response;
      });
    }
  }

  deleteTask() {
    this._tasksService.deleteTask(this.selectedTaskId).subscribe((response) => {
      this._tasksList = this._tasksList.filter((task) => task.id !== this.selectedTaskId);
    });
  }
}
